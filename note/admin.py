from django.contrib import admin

from note.models import Project, ToDo

admin.site.register(Project)
admin.site.register(ToDo)
