import django_filters
from rest_framework import generics, permissions, filters

from .models import Learner
from .serializer import LearnerDetailSerializer


class ApiLearnerListView(generics.ListCreateAPIView):
    queryset = Learner.objects.order_by(
        'last_name',
        'first_name',
        'patronymic',
    )
    serializer_class = LearnerDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = (
        'first_name',
        'last_name',
        'patronymic',
        'phone',
        'email',
    )
    filter_fields = ('phone', 'birthday',)


class ApiLearnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Learner.objects.all()
    serializer_class = LearnerDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
