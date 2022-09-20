from django.db import models

from appuser.models import AppUser
from todo import settings


class Project(models.Model):
    name = models.CharField(unique=True, verbose_name='Название', max_length=64)
    scv_link = models.CharField(verbose_name='Ссылка на репозиотрий', max_length=256, blank=True)
    users = models.ManyToManyField(AppUser)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=512)
    date_create = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    date_update = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name='Активен', default=True)

    def __str__(self):
        return f' {self.text[:15]} ... ({ self.project.name})'
