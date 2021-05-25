from rest_framework import serializers

from .models import Design

#https://stackoverflow.com/questions/31690991/uploading-base64-images-using-modelserializers-in-django-django-rest-framework

class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = ('id', 'name', 'content_image', 'content_json')
