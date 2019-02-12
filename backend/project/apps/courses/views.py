import django_filters
from rest_framework import generics, permissions, filters

from .models import Course
from .serializer import CourseDetailSerializer


class ApiCourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.order_by('name')
    serializer_class = CourseDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = ('name', 'description',)
    filter_fields = (
        'start_date',
        'end_date',
        'teachers',
        'groups',
        'groups__learners'
    )


class ApiCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
