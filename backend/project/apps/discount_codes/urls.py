from django.urls import path

from .views import (
    ApiDiscountCodeDetailView,
    ApiDiscountCodeListView,
)

urlpatterns = [
    path('api/discount_codes/', ApiDiscountCodeListView.as_view()),
    path('api/discount_codes/<int:pk>/', ApiDiscountCodeDetailView.as_view()),
]
