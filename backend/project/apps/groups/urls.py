from django.urls import path

from .views import (
    ApiGroupListView,
    ApiGroupDetailView,
)

urlpatterns = [
    path('api/groups/', ApiGroupListView.as_view()),
    path('api/groups/<int:pk>/', ApiGroupDetailView.as_view()),
]
