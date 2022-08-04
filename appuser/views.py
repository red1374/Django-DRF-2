from rest_framework.viewsets import ModelViewSet
from .models import AppUser
from .serializers import AppUserModelSerializer


class AppUserModelViewSet(ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserModelSerializer
