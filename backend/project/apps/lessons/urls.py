from django.urls import path

from .views import (
    ApiLessonListView,
    ApiLessonDetailView,
    ApiLessonBulkCreateView,
)

urlpatterns = [
    path('api/lessons/', ApiLessonListView.as_view()),
    path('api/lessons/<int:pk>/', ApiLessonDetailView.as_view()),
    path('api/lessons/bulk_create/', ApiLessonBulkCreateView.as_view()),
]
