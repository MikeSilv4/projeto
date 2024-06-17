
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
#router.register(r'', DeleteAll, basename='delete_all')

urlpatterns = [
    #path('delete_all/', include(router.urls)),
    path('', OrganizerViewSet.as_view(), name='OrganizerViewSet'),
]
