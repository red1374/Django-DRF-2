from django_filters import rest_framework as filters, DateFromToRangeFilter

from note.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
	name = filters.CharFilter(lookup_expr='contains')

	class Meta:
		model = Project
		fields = ['name']


class ToDoDateFilter(filters.FilterSet):
	# start_date = filters.DateFilter(field_name='date_range', lookup_expr='gt')
	# end_date = filters.DateFilter(field_name='create_date', lookup_expr='lt')
	# date_range = filters.DateRangeFilter(field_name='create_date')
	date_range = filters.DateFromToRangeFilter(field_name='create_date', label='Date (Between)')

	class Meta:
		model = ToDo
		fields = ['date_create']
