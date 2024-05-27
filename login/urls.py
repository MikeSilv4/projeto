
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('user/', include(router.urls)),
    path('registration/', RegisterPartcipant.as_view()),
    path('login/', LoginUser.as_view()),
]
