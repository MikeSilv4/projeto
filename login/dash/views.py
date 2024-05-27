from django.shortcuts import render
from django.http import HttpResponse
from autentication.models import CustomUserManager, CustomUser
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
import json

def login(request):
    return render(request, 'login/index.html')

def register(request):
    return render(request, 'register/index.html')
