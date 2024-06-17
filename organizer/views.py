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
from login.serializers import UserAllFieldsSerializer
from .serializers import OrganizerAllFieldsSerializer
from autentication.models import CustomUser
from django.contrib.auth import get_user_model


class OrganizerViewSet(GenericAPIView):

    def post(self, request):

        user = CustomUser.objects.filter(username=request.data['user_data']['email']).first()
        if user:
            return Response('This user arredy exist!', status=status.HTTP_409_CONFLICT)
        
        institution_object = OrganizerAllFieldsSerializer(data=request.data['institution_data'])
        if institution_object.is_valid():
            institution_object = institution_object.save()

            data = request.data['user_data']
            cpf = data['cpf']
            born_date = data['born_date']
            email = data['email']
            first_name = data['first_name']
            last_name = data['last_name']
            passwd = data['password']
            is_organizer = institution_object
            user = get_user_model()
            user.objects.create_user(email=email, password=passwd, born_date=born_date, cpf=cpf, first_name=first_name, last_name=last_name, is_organizer=is_organizer)

            return Response('ok', status=status.HTTP_200_OK)

        else:
            return Response({'errors' : {'institution' : institution_object.errors,}} , status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, *args, **kwargs):
        user = CustomUser.objects.get(id=user_id)
        lig = Organizer.objects.get(id=user.is_organizer.pk)
        event = Events.objects.get(id=lig.event_id.pk)
        print(vars(user))
        print(lig)
        print(event)
        return Response('ok')