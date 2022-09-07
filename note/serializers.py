from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        # fields = ('id', 'name', 'users', 'scv_link')


# HyperlinkedModelSerializer
class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        # fields = ('user', 'text', 'project')
        fields = '__all__'
