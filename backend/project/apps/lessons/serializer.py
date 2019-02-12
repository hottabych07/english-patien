from rest_framework import serializers

from project.apps.lessons.models import Lesson


class LessonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        extra_kwargs = {'created_at': {'read_only': True}}
        fields = (
            'id',
            'course',
            'name',
            'groups',
            'teacher',
            'created_at',
            'start_time',
            'end_time',
            'lesson_type',
            'location',
            'bg_color',
        )
