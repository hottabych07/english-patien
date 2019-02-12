from rest_framework import serializers

from project.apps.courses.models import Course


class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            'id',
            'name',
            'description',
            'teachers',
            'start_date',
            'end_date',
            'created_at',
            'groups',
        )
