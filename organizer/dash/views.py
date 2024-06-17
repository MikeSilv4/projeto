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

@login_required
def home(request):
    context = {}
    user = request.user
    user = CustomUser.objects.get(pk=user.pk)
    organizer = Organizer.objects.get(pk=user.is_organizer.pk)
    context['organizer'] = organizer
    event = EventAllFieldsSerializer(organizer.event_id)
    context['event'] = event.data

    return render(request, 'organizer/home/index.html', context)

@login_required
def event_edit(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    organizer = Organizer.objects.get(pk=user.is_organizer.pk)
    event = EventAllFieldsSerializer(organizer.event_id)
    context['event'] = event.data
    return render(request, 'organizer/home/event_index_edit.html', context)

@login_required
def event_create(request):
    return render(request, 'organizer/home/event_index_create.html')

@login_required
def edit_user(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    user.born_date = user.born_date.strftime("%Y-%m-%d")
    context['user'] = user

    return render(request, 'organizer/user_edit/index.html', context)