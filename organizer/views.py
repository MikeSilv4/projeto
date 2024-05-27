from django.shortcuts import render
from rest_framework.views import APIView
from autentication.models import CustomUserManager, CustomUser
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.auth import authenticate, login
from django.template import loader
from django.http import HttpResponse
from django.shortcuts import redirect
from organizer.dash.views import home
from django.http import HttpResponseRedirect
from autentication.models import Organizer