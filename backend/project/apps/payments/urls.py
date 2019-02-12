from django.urls import path

from .views import (
    ApiPaymentListView,
    ApiPaymentDetailView,
)

urlpatterns = [
    path('api/payments/', ApiPaymentListView.as_view()),
    path('api/payments/<int:pk>/', ApiPaymentDetailView.as_view()),
]
