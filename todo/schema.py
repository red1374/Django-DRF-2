import graphene
from graphene import ObjectType, String, Schema

from appuser.models import AppUser
from note.models import ToDo, Project
from graphene_django import DjangoObjectType

# -- Query 1 --------------------------------
#
# class Query(ObjectType):
#     # this defines a Field `hello` in our Schema with a single Argument `name`
#     hello = String(name=String(default_value="stranger"))
#     goodbye = String()
#
#     # our Resolver method takes the GraphQL context (root, info) as well as
#     # Argument (name) for the Field and returns data for the query Response
#     def resolve_hello(root, info, name):
#         return f'Hello {name}!'
#
#     def resolve_goodbye(root, info):
#         return 'See ya!'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = AppUser
        fields = '__all__'

# -- Query 2 --------------------------------
# class Query(graphene.ObjectType):
#     project_by_id = graphene.List(ProjectType, id=graphene.Int(required=True))
#     def resolve_project_by_id(root, info, id):
#         try:
#             return Project.objects.get(id=id)
#         except Project.DoesNotExist:
#             return None

# -- Query 3 --------------------------------
# class Query(graphene.ObjectType):
#     project_by_name = graphene.List(ProjectType, name=graphene.String(required=False))
#
#     def resolve_project_by_name(root, info, name):
#         if name:
#             return Project.objects.filter(name__contains=name)
#         return Project.objects.all()


class ToDoUpdateMutation(graphene.Mutation):
    class Arguments():
        text = graphene.String()
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        todo = ToDo.objects.get(id=kwargs.get('id'))
        todo.text = kwargs.get('text')
        todo.save()
        return cls(todo=todo)


class ToDoCreateMutation(graphene.Mutation):
    class Arguments():
        text = graphene.String()
        project_id = graphene.Int()
        user_id = graphene.Int()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, text, project_id, user_id):
        project = Project.objects.get(id=project_id)
        user = AppUser.objects.get(id=user_id)
        todo = ToDo.objects.create(text=text, project=project, user=user)
        return cls(todo=todo)


class ToDoDeleteMutation(graphene.Mutation):
    class Arguments():
        id = graphene.ID()

    todos = graphene.List(ToDoType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        todo = ToDo.objects.get(id=kwargs.get('id')).delete()
        return cls(todos=ToDo.objects.all())


class Mutations(ObjectType):
    update_todo = ToDoUpdateMutation.Field()
    create_todo = ToDoCreateMutation.Field()
    delete_todo = ToDoDeleteMutation.Field()


class Query(ObjectType):
    todo_list = graphene.List(ToDoType)
    projects_list = graphene.List(ProjectType)
    users_list = graphene.List(UserType)
    project_by_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_todo_list(root, info):
        return ToDo.objects.all()

    def resolve_project_list(root, info):
        return Project.objects.all()

    def resolve_users_list(root, info):
        return AppUser.objects.all()

    def resolve_project_by_name(root, info, name):
        if name:
            return Project.objects.filter(name__contains=name)
        return Project.objects.all()


schema = Schema(query=Query, mutation=Mutations)

