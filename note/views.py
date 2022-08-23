from django.db.models import Q
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# from note.filters import ProjectFilter
from note.filters import ToDoDateFilter
from note.models import Project, ToDo
from note.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    # filterset_class = ProjectFilter

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        if name:
            return Project.objects.filter(Q(name__iregex=name))
        return Project.objects.all()


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDOLimitOffsetPagination
    filterset_class = ToDoDateFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        project_name = self.request.query_params.get('project', '')
        if project_name:
            return ToDo.objects.filter(Q(project__name__iregex=project_name))

        return ToDo.objects.all()
