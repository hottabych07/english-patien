from rest_framework import serializers

from project.apps.users.models import User


class UserDetailSerializerForAuth(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'patronymic',
            'role',
            'phone',
            'birthday',
        )


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'patronymic',
            'role',
            'phone',
            'birthday',
        )


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'patronymic',
            'role',
            'phone',
            'birthday',
            'is_active',
        )


class UserCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'patronymic': {'required': False},
            'phone': {'required': False},
            'birthday': {'required': False},
        }
        fields = (
            'email',
            'username',
            'first_name',
            'last_name',
            'patronymic',
            'role',
            'phone',
            'birthday',
            'password',
        )
