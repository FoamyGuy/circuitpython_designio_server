import base64
import hashlib
import io
import json
import os

import requests
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from circuitpython_designio_server.settings import MEDIA_ROOT, ALLOWED_HOSTS, PORT_STR
from .aio_credentials import aio_credentials
from .models import Design
from .serializer import DesignSerializer
from django.core.files.base import ContentFile, File
from PIL import Image
from io import BytesIO
import base64


class DesignView(viewsets.ModelViewSet):
    serializer_class = DesignSerializer
    queryset = Design.objects.all()


class CreateDesignView(View):
    def post(self, request):
        # print(request.POST.get("image_base64"))

        name = request.POST.get("name")
        json_data = request.POST.get("json")
        if not json_data:
            return JsonResponse({"success": False, "error": "Missing parameter json"}, status=400)
        print(json_data)
        format, imgstr = request.POST.get("image_base64").split(';base64,')
        ext = format.split('/')[-1]

        print(format)
        print(ext)
        im = Image.open(BytesIO(base64.b64decode(imgstr)))

        # data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)  # You can save this as file instance.

        blob = BytesIO()
        im = im.convert(mode="P", palette=Image.WEB)
        im.save(blob, "bmp")

        new_design = Design(name=name)
        new_design.content_image.save('temp.bmp', File(blob), save=True)
        new_design.user = request.user

        new_design.content_json = json_data

        new_design.save()
        return JsonResponse({
            "success": True,
            "view_design_url": reverse("frontend:design_uuid", kwargs={"design_uuid": new_design.uuid})
        })


class UpdateDesignWebhooksView(View):
    def post(self, request, design_id):
        try:
            design = Design.objects.get(id=design_id, user=request.user)
        except Design.DoesNotExist:
            return JsonResponse({"success": False, "error": "Design not found"})

        preview_webhook_url = request.POST.get("preview_webhook")
        signature_webhook_url = request.POST.get("signature_webhook")

        design.aio_webhook_signature = signature_webhook_url
        design.aio_webhook_image = preview_webhook_url
        design.save()
        return JsonResponse({"success": True})

class UpdateDesignView(View):
    def post(self, request, design_id):

        try:
            design = Design.objects.get(id=design_id, user=request.user)
        except Design.DoesNotExist:
            return JsonResponse({"success": False, "error": "Design not found"})

        name = request.POST.get("name")

        json_data = request.POST.get("json")
        print(json_data)
        format, imgstr = request.POST.get("image_base64").split(';base64,')
        ext = format.split('/')[-1]

        im = Image.open(BytesIO(base64.b64decode(imgstr)))
        blob = BytesIO()
        im = im.convert(mode="P", palette=Image.WEB)
        im.save(blob, "bmp")

        # content_image = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)  # You can save this as file instance.

        design.content_json = json_data
        file_name = design.content_image.name.split("/")[-1]
        print("filename: {}".format(file_name))
        print("deleting: {}".format(MEDIA_ROOT + "/content/" + file_name))
        os.remove(MEDIA_ROOT + "/content/" + file_name)
        design.content_image.save(file_name, File(blob), save=True)
        design.name = name
        design.save()

        process_aio_hooks(design)
        return JsonResponse({'success': True})


class UploadAIODesignView(View):
    def post(self, request, design_id):

        try:
            design = Design.objects.get(id=design_id, user=request.user)
        except Design.DoesNotExist:
            return JsonResponse({"success": False, "error": "Design not found"})

        name = request.POST.get("name")

        json_data = request.POST.get("json")
        print(json_data)
        format, imgstr = request.POST.get("image_base64").split(';base64,')
        ext = format.split('/')[-1]

        io = BytesIO()
        im = Image.open(BytesIO(base64.b64decode(imgstr)))
        im = im.convert(mode="P", palette=Image.WEB)

        # im.save(io, format="bmp")
        im.save(io, format="png")
        io.seek(0)

        imgstr = base64.b64encode(io.read())
        # imgstr_size = len(imgstr.encode('utf-8'))
        imgstr_size = len(imgstr)

        print("imgstr bytes: {}".format(imgstr_size))

        if imgstr_size > 102400:
            im = im.convert('RGB')
            optim_stream = io.BytesIO()

            im.save(optim_stream, format='jpeg', quality=90, optimize=True)
            # im.save(optim_stream, format='bmp', optimize=True)
            optim_stream.seek(0)

            # convert image binary data to base64 string
            imgstr = base64.b64encode(optim_stream.read())

            imgstr_size = len(imgstr)
            print("imgstr bytes after compress: {}".format(imgstr_size))

        # aio_url = "https://io.adafruit.com/api/v2/{username}/feeds/{feed_key}/data"
        aio_url = "https://io.adafruit.com/api/v2/{}/feeds/designio.{}/data".format(aio_credentials['aio_username'],
                                                                                    design.name)
        data = {'value': imgstr}
        headers = {'X-AIO-Key': aio_credentials['aio_key']}

        resp = requests.post(aio_url, data=data, headers=headers)
        print(resp.content)

        # post JSON signature string

        aio_url = "https://io.adafruit.com/api/v2/webhooks/feed/JtMDYjqUbCTPzcF3d2P6bpwyU547"
        #aio_url = "https://io.adafruit.com/api/v2/{}/feeds/designio.image-signature/data".format(
            #aio_credentials['aio_username'])
        img_md5 = hashlib.md5(open(design.content_image.path, 'rb').read()).hexdigest()
        signature_data = {
            "value": json.dumps({
                "md5": img_md5,
                "url": "http://{}/media/{}".format(
                    request.get_host(), design.content_image.name
                )})
            }


        print(signature_data)
        headers = {'X-AIO-Key': aio_credentials['aio_key']}


        resp = requests.post(aio_url, data=signature_data, headers=headers)
        print(resp.status_code)
        print(resp.content)

        return JsonResponse({'success': True})


def process_aio_hooks(design):
    if design.aio_webhook_image:

        io = BytesIO()
        print(MEDIA_ROOT + "/" + design.content_image.name)
        im = Image.open(MEDIA_ROOT + "/" + design.content_image.name)
        im = im.convert(mode="P", palette=Image.WEB)

        # im.save(io, format="bmp")
        im.save(io, format="png")
        io.seek(0)

        imgstr = base64.b64encode(io.read())
        # imgstr_size = len(imgstr.encode('utf-8'))
        imgstr_size = len(imgstr)

        print("imgstr bytes: {}".format(imgstr_size))

        if imgstr_size > 102400:
            im = im.convert('RGB')
            optim_stream = io.BytesIO()

            im.save(optim_stream, format='jpeg', quality=90, optimize=True)
            # im.save(optim_stream, format='bmp', optimize=True)
            optim_stream.seek(0)

            # convert image binary data to base64 string
            imgstr = base64.b64encode(optim_stream.read())

            imgstr_size = len(imgstr)
            print("imgstr bytes after compress: {}".format(imgstr_size))

        # aio_url = "https://io.adafruit.com/api/v2/{username}/feeds/{feed_key}/data"
        aio_url = design.aio_webhook_image

        data = {'value': imgstr}

        resp = requests.post(aio_url, data=data)
        print(resp.content)

    if design.aio_webhook_signature:
        img_md5 = hashlib.md5(open(design.content_image.path, 'rb').read()).hexdigest()
        signature_data = {
            "value": json.dumps({
                "md5": img_md5,
                "url": "http://{}{}/media/{}".format(
                    ALLOWED_HOSTS[0], PORT_STR, design.content_image.name
                )})
        }

        print(signature_data)
        resp = requests.post(design.aio_webhook_signature, data=signature_data)
        print(resp.status_code)
        print(resp.content)