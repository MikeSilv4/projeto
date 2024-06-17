from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'user_events', UserEventViewSet, basename='user_events')

urlpatterns = [
    path('', include(router.urls)),
]
    