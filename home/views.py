from django.shortcuts import render
from django.http import HttpResponse
from autentication.models import CustomUserManager, CustomUser
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
import json
from event.models import Events
