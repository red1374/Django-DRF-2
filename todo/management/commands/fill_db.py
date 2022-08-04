import os
import json

from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from appuser.models import AppUser

JSON_PATH = 'todo\json'


def load_from_json(file_name):
    path_to_file = os.path.join(JSON_PATH, file_name + '.json')
    with open(path_to_file, 'r') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users_list = load_from_json('users')
        if not users_list:
            print('Empty "users.json" file!')
            return False

        AppUser.objects.all().delete()

        for user in users_list:
            user['password'] = make_password(user['password'])
            AppUser.objects.create(**user)

        if not AppUser.objects.filter(username='django'):
            AppUser.objects.create_superuser('django', 'support@pleshakov.org', 'geekbrains')
