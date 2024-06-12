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
from rest_framework.generics import GenericAPIView
from autentication.models import *


class DeleteAll(GenericAPIView):

    def delete(self, request, user_id, *args, **kwargs):
        user = CustomUser.objects.get(id=user_id)
        lig = Organizer.objects.get(id=user.is_organizer.pk)
        event = Events.objects.get(id=lig.event_id.pk)
        print(vars(user))
        print(lig)
        print(event)
        return Response('ok')