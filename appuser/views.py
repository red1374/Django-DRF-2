from rest_framework import mixins, viewsets
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import AppUser
from .serializers import AppUserModelSerializer, AppUserModelSerializerFull


# class AppUserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 2

class AppUserPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'size'


class AppUserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                           viewsets.GenericViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = AppUserLimitOffsetPagination
    pagination_class = AppUserPageNumberPagination
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return AppUserModelSerializer

        return AppUserModelSerializerFull
