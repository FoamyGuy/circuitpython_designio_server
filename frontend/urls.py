from django.contrib.auth.decorators import login_required
from django.urls import path, include


from . import views
from .views import IndexView, DocsView, ViewDesignView, ViewDesignUUIDView, ListDesignsView, PyPortalDesignView, \
    CodePyDesignView, PyPortalDesignUUIDView, CreateDesignView, UserProfileView

app_name = "frontend"




urlpatterns = [
    path('', IndexView.as_view()),
    path('docs/', DocsView.as_view(), name="docs"),
    #path('view/design/<int:design_id>/', login_required(ViewDesignView.as_view()), name='design'),
    path('view/design/u/<uuid:design_uuid>/', ViewDesignUUIDView.as_view(), name='design_uuid'),
    path('accounts/profile/', login_required(UserProfileView.as_view()), name="user_profile"),
    path('list/designs/', login_required(ListDesignsView.as_view()), name="list_designs"),
    path('create/design/', CreateDesignView.as_view(), name='create_design'),
    #path('pyportal/design/<int:design_id>/', PyPortalDesignView.as_view(), name='pyportal_design'),
    path('codepy/design/u/<uuid:design_uuid>/', CodePyDesignView.as_view(), name="codepy_design"),
    path('pyportal/design/u/<uuid:design_uuid>/', PyPortalDesignUUIDView.as_view(), name='pyportal_design_uuid'),

]