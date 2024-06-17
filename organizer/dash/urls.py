from django.urls import path, include
from .views import *

app_name = 'organizer'

urlpatterns = [
    path('home/', home, name='home'),
    path('home/event-edit/', event_edit, name='event_edit'),
    path('home/event-create/', event_create, name='event-crate'),
    path('home/user_edit/', edit_user, name='user_edit'),
]