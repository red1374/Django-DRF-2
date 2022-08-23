from rest_framework import mixins, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import AppUser
from .serializers import AppUserModelSerializer


class AppUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class AppUserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                           viewsets.GenericViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    pagination_class = AppUserLimitOffsetPagination
