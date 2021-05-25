from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include
from rest_framework import routers

from . import views
from .views import UploadAIODesignView, UpdateDesignView, UpdateDesignWebhooksView

app_name = "backend"
router = routers.DefaultRouter()
router.register(r'plans', views.DesignView, 'plan')


urlpatterns = [
    path('api/', include(router.urls)),
    path('create_design/', login_required(views.CreateDesignView.as_view()), name='create_design'),
    #path('upload_aio/design/<int:design_id>/', login_required(UploadAIODesignView.as_view()), name='upload_aio_design'),
    path('update/design/<int:design_id>/', login_required(UpdateDesignView.as_view()), name='design'),
    path('update/design/<int:design_id>/webhooks/', login_required(UpdateDesignWebhooksView.as_view()), name='design_webhooks'),


]