from django.urls import path

from appuser.views import AppUserCustomViewSet

app_name = 'appuser'
urlpatterns = [
    path('', AppUserCustomViewSet.as_view({'get': 'list'})),
]
