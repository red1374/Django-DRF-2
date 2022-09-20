from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from appuser.serializers import AppUserModelSerializer
from .models import Project, ToDo
from appuser.models import AppUser


class ProjectModelSerializer(ModelSerializer):
    # users = AppUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'
        # fields = ('id', 'name', 'users', 'scv_link')

    # def create(self, validated_data):
    #     ids = [int(item.get('pk')) for item in self.initial_data.get('users')]
    #     users = AppUser.objects.filter(pk__in=ids)
    #     if len(users) > 1:
    #         validated_data['users'] = users
    #
    #     project = Project.objects.create(name=validated_data.get('name'), scv_link=validated_data.get('scv_link'))
    #     project.users.set(users)
    #
    #     return project


# HyperlinkedModelSerializer
class ToDoModelSerializer(ModelSerializer):
    # user = AppUserModelSerializer(many=False)
    # project = ProjectModelSerializer()

    class Meta:
        model = ToDo
        # fields = ('user', 'text', 'project')
        fields = '__all__'

    # def create(self, validated_data):
    #     user = AppUser.objects.filter(pk__in=int(self.initial_data.get('user')))
    #     project = Project.objects.filter(pk__in=int(self.initial_data.get('project')))
    #     note = To Do.objects.create(text=validated_data.get('text'), user=user, project=project)
    #
    #     return note
