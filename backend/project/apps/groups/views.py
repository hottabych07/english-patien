import django_filters
from rest_framework import generics, permissions, filters

from .models import Group
from .serializer import GroupDetailSerializer


class ApiGroupListView(generics.ListCreateAPIView):
    queryset = Group.objects.order_by('name')
    serializer_class = GroupDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = ('name',)
    filter_fields = ('name', 'learners', 'created_at',)


class ApiGroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
