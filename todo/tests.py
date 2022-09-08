import json

from django.contrib.auth.hashers import make_password
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase

from mixer.backend.django import mixer
from django.contrib.auth import get_user_model

from note.views import ProjectModelViewSet, ToDoModelViewSet
from note.models import Project, ToDo

User = get_user_model()


class TestProjectModelViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.format = 'json'
        self.user1 = User.objects.create(first_name='User1', username='user1', email='user1@email.ru',
                          password=make_password('password1'))
        self.user2 = User.objects.create(first_name='User2', username='user2', email='user2@email.ru',
                          password=make_password('password2'))
        self.project_dict = {'name': 'Project 1', 'users': [self.user1.id, self.user2.id]}
        self.project2 = {'name': 'Project 2', 'users': [self.user1.id, self.user2.id]}

        self.project = Project.objects.create(name='Project 1')
        self.project.users.set((self.user1, self.user2))

        self.username = 'admin'
        self.password = 'password2'
        self.admin = User(first_name='Admin', username=self.username, email='admin@email.ru',
                          password=make_password(self.password), is_superuser=True)

    def tearDown(self) -> None:
        pass

    # -- Tests with APIRequestFactory -----------------------------
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        factory = APIRequestFactory()

        request = factory.post(self.url, self.project_dict, format=self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()

        request = factory.post(self.url, self.project2, format=self.format)
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # -- Tests with APIClient -----------------------------------
    def test_api_client_get_project_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_update_quest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.project.id}/', **self.project2)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_update_admin(self):
        client = APIClient()
        client.login(username=self.username, password=self.password)
        response = client.put(f'{self.url}{self.project.id}/', self.project2, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.project.refresh_from_db()
        self.assertEqual(self.project.name, self.project2.get('name'))

        client.logout()


# -- Tests with APITestCase -----------------------------------
class TestToDoModelViewSet(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/notes/'
        self.format = 'json'
        self.username = 'test_123'
        self.password = 'paSSword__1'
        self.admin = User.objects.create(first_name='Admin', username=self.username, email='admin@email.ru',
                          password=make_password(self.password), is_superuser=True)
        self.user = User.objects.create(first_name='Test1', username='Test_4444', email='test@email.ru',
                          password=make_password('Test_4544535313'))
        self.note = {'project': 1, 'user': 1, 'text': 'Test'}

    def test_api_test_case_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mixer(self):
        project = mixer.blend(Project)
        note = mixer.blend(ToDo, project=project, user=self.user)

        self.client.force_login(self.admin)

        response = self.client.put(f'{self.url}{note.id}/', self.note)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        note.refresh_from_db()
        self.assertEqual(note.text, self.note.get('text'))
        self.client.logout()
