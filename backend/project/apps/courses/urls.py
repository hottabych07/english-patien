from django.urls import path

from .views import (
    ApiCourseListView,
    ApiCourseDetailView,
)

urlpatterns = [
    path('api/courses/', ApiCourseListView.as_view()),
    path('api/courses/<int:pk>/', ApiCourseDetailView.as_view()),
]
