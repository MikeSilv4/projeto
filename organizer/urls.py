
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
#router.register(r'', DeleteAll, basename='delete_all')

urlpatterns = [
    #path('delete_all/', include(router.urls)),
    path('delete_all/<int:user_id>/', DeleteAll.as_view(), name='delete_all'),
]
