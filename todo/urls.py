"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include, re_path

from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from appuser.views import AppUserCustomViewSet
from note.views import ProjectModelViewSet, ToDoModelViewSet, get_menu, get_data

from rest_framework.authtoken import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register('users', AppUserCustomViewSet)
router.register('projects', ProjectModelViewSet)
# router.register('projects', ProjectCustomViewSet)
router.register('notes', ToDoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="suppoer@pleshakov.org"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('menu/<str:name>/', get_menu),
    path('get/<str:name>/', get_data),

    path('api-token-auth/', views.obtain_auth_token),

    # path('', include('appuser.urls_v1')),

    # path('api/users/v1', include('appuser.urls', namespace='v1')),
    # path('api/users/v2', include('appuser.urls', namespace='v2')),

    path('swagger<str:format>', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),

    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
