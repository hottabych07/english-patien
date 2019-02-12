from django.conf.urls import include
from django.urls import path
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)

from .views import ApiUserDetailView, ApiUserListView

urlpatterns = [
    path('api/token/obtain/', obtain_jwt_token),
    path('api/token/refresh/', refresh_jwt_token),
    path('api/token/verify/', verify_jwt_token),

    path('api/users/', ApiUserListView.as_view()),
    path('api/users/<int:pk>/', ApiUserDetailView.as_view()),

    path('api/auth/', include('rest_auth.urls')),
]
