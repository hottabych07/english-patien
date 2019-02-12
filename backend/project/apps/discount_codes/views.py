import django_filters
from rest_framework import generics, permissions, filters

from .models import DiscountCode
from .serializer import DiscountCodeDetailSerializer


class ApiDiscountCodeListView(generics.ListCreateAPIView):
    queryset = DiscountCode.objects.order_by('-id')
    serializer_class = DiscountCodeDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = ('name', 'description', 'code', 'status',)
    filter_fields = ('status', 'learners',)


class ApiDiscountCodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiscountCode.objects.all()
    serializer_class = DiscountCodeDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
