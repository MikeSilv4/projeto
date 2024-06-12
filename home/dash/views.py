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

@login_required(redirect_field_name="/dash/login/")
def home(request):
    context = {}

    return render(request, 'home/pagina_inicial/index.html', context)

@login_required(redirect_field_name="/dash/login/")
def edit_user(request):
    context = {}
    user = CustomUser.objects.get(pk=request.user.pk)
    user.born_date = user.born_date.strftime("%Y-%m-%d")
    context['user'] = user

    return render(request, 'home/user_edit/index.html', context)