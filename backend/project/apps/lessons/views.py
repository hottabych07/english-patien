from django_filters import rest_framework
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, views, status
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from .models import Lesson
from .serializer import LessonDetailSerializer


class LessonListFilter(rest_framework.FilterSet):
    start_time_gte = filters.DateTimeFilter(
        field_name='start_time',
        lookup_expr='gte',
    )
    start_time_lte = filters.DateTimeFilter(
        field_name='start_time',
        lookup_expr='lte',
    )
    end_time_gte = filters.DateTimeFilter(
        field_name='end_time',
        lookup_expr='gte',
    )
    end_time_lte = filters.DateTimeFilter(
        field_name='end_time',
        lookup_expr='lte',
    )

    class Meta:
        model = Lesson
        fields = (
            'course',
            'groups',
            'teacher',
            'created_at',
            'start_time',
            'start_time_gte',
            'start_time_lte',
            'end_time',
            'end_time_gte',
            'end_time_lte',
            'lesson_type',
            'location',
        )


class ApiLessonListView(generics.ListCreateAPIView):
    queryset = Lesson.objects.order_by('start_time')
    serializer_class = LessonDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    search_fields = ('name',)
    filterset_class = LessonListFilter


class ApiLessonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.order_by('start_time')
    serializer_class = LessonDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ApiLessonBulkCreateView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        raw_lessons = request.data

        serializers = []

        for raw_lesson in raw_lessons:
            serializer = LessonDetailSerializer(data=raw_lesson)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializers.append(serializer)

        for serializer in serializers:
            serializer.save()

        return Response(status=status.HTTP_201_CREATED)
