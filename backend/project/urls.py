from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('project.apps.users.urls')),
    path('', include('project.apps.groups.urls')),
    path('', include('project.apps.courses.urls')),
    path('', include('project.apps.learners.urls')),
    path('', include('project.apps.lessons.urls')),
    path('', include('project.apps.payments.urls')),
    path('', include('project.apps.discount_codes.urls')),
]
