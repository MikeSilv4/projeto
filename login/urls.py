
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'login'

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('user/', include(router.urls)),
    path('registration/', RegisterPartcipant.as_view()),
    path('login/', LoginUser.as_view()),
    path('send_mail/', SendMail.as_view()),
    path('new-password/', password.as_view()),
    path('logout/', LogoutView, name='LogoutView'),
]
