import django_filters
from rest_framework import generics, permissions, filters

from .models import User
from .serializer import (
    UserDetailSerializer,
    UserListSerializer,
    UserCreateSerializer,
)


class ApiUserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = (
        'username',
        'first_name',
        'last_name',
        'email',
        'phone',
    )
    filter_fields = ('username', 'role',)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer

        return self.serializer_class


class ApiUserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
