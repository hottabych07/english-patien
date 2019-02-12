from rest_framework import serializers

from .models import Learner


class LearnerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner
        fields = (
            'id',
            'first_name',
            'last_name',
            'patronymic',
            'phone',
            'email',
            'birthday',
        )
