from django.urls import path

from .views import (
    ApiLearnerListView,
    ApiLearnerDetailView,
)

urlpatterns = [
    path('api/learners/', ApiLearnerListView.as_view()),
    path('api/learners/<int:pk>/', ApiLearnerDetailView.as_view()),
]
