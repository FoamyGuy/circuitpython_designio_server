import hashlib
import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View

from backend.models import Design
from circuitpython_designio_server.settings import ALLOWED_HOSTS, PORT, PROTOCOL


class IndexView(View):
    def get(self, request):
        return render(request, "frontend/front_page/index.html", {})

class UserProfileView(View):
    def get(self, request):
        return render(request, "frontend/user/profile.html", {})

# class LoginView(View):
#     def get(self, request):
#         return render(request, "frontend/user/login.html", {})


class DocsView(View):
    def get(self, request):
        return redirect("/static/docs/index.html")

class CreateDesignView(View):
    def get(self, request):
        return render(request, 'frontend/polotno_designer.html', {"context_data": json.dumps({"hello": "world"})})


class ViewDesignView(View):
    def get(self, request, design_id):
        try:
            design_obj = Design.objects.get(id=design_id, user=request.user)
        except Design.DoesNotExist:
            return HttpResponse("Design Not Found")

        return render(request, 'frontend/polotno_designer.html',
                      {"context_data": json.dumps({"id": design_obj.id, "design_json": design_obj.content_json})})


class ListDesignsView(View):
    def get(self, request):
        user_designs = Design.objects.filter(user=request.user).order_by("-id")
        design_rows = [user_designs[i:i+4] for i in range(0, len(user_designs), 4)]
        return render(request, 'frontend/list_designs.html', {"design_rows": design_rows})


class ViewDesignUUIDView(View):
    def get(self, request, design_uuid):
        try:
            design_obj = Design.objects.get(uuid=design_uuid, user=request.user)
        except Design.DoesNotExist:
            return HttpResponse("Design Not Found")

        return render(request, 'frontend/polotno_designer.html',
                      {"context_data": json.dumps(
                          {"id": design_obj.id,
                           "uuid": str(design_obj.uuid),
                           "name": design_obj.name,
                           "preview_webhook_url": design_obj.aio_webhook_image,
                           "signature_webhook_url": design_obj.aio_webhook_signature,
                           "design_json": design_obj.content_json})})


class CodePyDesignView(View):
    def get(self, request, design_uuid):
        try:
            design_obj = Design.objects.get(uuid=design_uuid, user=request.user)
        except Design.DoesNotExist:
            return HttpResponse("Design Not Found")

        url = PROTOCOL + ALLOWED_HOSTS[0]
        if PORT != 80:
            url = "{}:{}".format(url, PORT)
        response = HttpResponse(
            render(request,
                   'code_py/code.py', {
                       "host": url,
                       "uuid": design_uuid
                   }, content_type="text/x-python"))

        response['Content-Disposition'] = 'attachment; filename=designio_code.py'
        return response


class PyPortalDesignView(View):
    def get(self, request, design_id):
        design_obj = Design.objects.get(id=design_id)

        img_md5 = hashlib.md5(open(design_obj.content_image.path, 'rb').read()).hexdigest()
        return JsonResponse(
            {
                "image": design_obj.content_image.name,
                "md5": img_md5
            })


class PyPortalDesignUUIDView(View):
    def get(self, request, design_uuid):
        design_obj = Design.objects.get(uuid=design_uuid)

        img_md5 = hashlib.md5(open(design_obj.content_image.path, 'rb').read()).hexdigest()
        return JsonResponse(
            {
                "image": design_obj.content_image.name,
                "md5": img_md5
            })
