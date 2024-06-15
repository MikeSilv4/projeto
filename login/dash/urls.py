from django.urls import path, include
from .views import *

app_name = 'dash_login'

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('passwd/', passwd, name='passwd'),
]