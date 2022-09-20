from rest_framework.serializers import HyperlinkedModelSerializer
from .models import AppUser


class AppUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
        # fields = '__all__'


class AppUserModelSerializerFull(HyperlinkedModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
