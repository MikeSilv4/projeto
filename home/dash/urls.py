from django.urls import path, include
from .views import *

app_name = 'home'

urlpatterns = [
    path('', home, name='home'),
    path('edit-user/', edit_user, name='edit_user'),
    path('events/', events, name='events'),
    path('create-organizer/', create_organizer, name='create_organizer'),
    path('participant-events/', participant_events, name='participant_events'),
    path('new-password/', new_passwd, name='new_passwd'),
]