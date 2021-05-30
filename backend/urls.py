from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include
# from rest_framework import routers

from . import views
from .views import UpdateDesignWebhooksView, DeleteDesignView, UpdateDesignUUIDView

app_name = "backend"
# router = routers.DefaultRouter()
# router.register(r'plans', views.DesignView, 'plan')


urlpatterns = [
    #path('api/', include(router.urls)),
    path('create_design/', views.CreateDesignView.as_view(), name='create_design'),
    path('update/webhooks/', views.UpdateUserWebhooksView.as_view(), name='user_webhooks'),
    #path('update/design/<int:design_id>/', UpdateDesignView.as_view(), name='design'),
    path('update/design/u/<uuid:design_uuid>/', UpdateDesignUUIDView.as_view(), name='update_design_uuid'),
    path('delete/design/u/<uuid:design_uuid>/', login_required(DeleteDesignView.as_view()), name='delete_design'),
    path('update/design/u/<uuid:design_uuid>/webhooks/', UpdateDesignWebhooksView.as_view(), name='design_webhooks'),


]