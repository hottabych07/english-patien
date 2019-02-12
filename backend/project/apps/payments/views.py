import django_filters
from rest_framework import generics, permissions, filters

from .models import Payment
from .serializer import PaymentDetailSerializer


class ApiPaymentListView(generics.ListCreateAPIView):
    queryset = Payment.objects.order_by('-created_at')
    serializer_class = PaymentDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
    )
    search_fields = ('comment', 'status',)
    filter_fields = ('status', 'learner',)


class ApiPaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
