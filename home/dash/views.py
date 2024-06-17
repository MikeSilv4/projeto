from django.shortcuts import render
from django.http import HttpResponse
from autentication.models import CustomUserManager, CustomUser
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.auth.decorators import login_required
from autentication.models import Organizer, CustomUser
from event.serializers import EventAllFieldsSerializer
from home.models import UserEvents

@login_required
def home(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    context['user'] = user
    print(context)
    return render(request, 'home/pagina_inicial/index.html', context)

@login_required
def edit_user(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    user.born_date = user.born_date.strftime("%Y-%m-%d")
    context['user'] = user

    return render(request, 'home/user_edit/index.html', context)

@login_required
def events(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    user_events = UserEvents.objects.filter(user_id=user.pk)
    user_events = [i.event.pk for i in user_events]
    context['user'] = user
    context['user_events'] = user_events
    return render(request, 'home/events/index.html', context)

@login_required
def participant_events(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    user_events = UserEvents.objects.filter(user_id=user.pk)
    user_events = [i.event.pk for i in user_events]
    context['user'] = user
    context['user_events'] = user_events
    return render(request, 'home/participant_events/events/index.html', context)

@login_required
def create_organizer(request):
    context = {}
    return render(request, 'home/organizer/create/index.html', context)