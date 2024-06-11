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
from organizer.dash.views import home
from rest_framework import viewsets
from .serializers import *
from autentication.models import CustomUser
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class RegisterPartcipant(APIView):
        
    def post(self, request):

        data = request.data
        cpf = data['cpf']
        born_date = data['born_date']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        passwd = data['passwd1']

        user = CustomUser.objects.filter(username=email).first()
        if user:
            return Response('This user arredy exist!', status=status.HTTP_409_CONFLICT)
        
        user = get_user_model()
        user = user.objects.create_user(email=email, password=passwd, born_date=born_date, cpf=cpf, first_name=first_name, last_name=last_name)
    
        login(request, user)
        return HttpResponseRedirect('/dash/home/')
        
class LoginUser(APIView):
     def post(self, request):

        data = request.data
        username = data['email']
        passwd = data['passwd']

        user = authenticate(username=username, password=passwd)
        if user:
            user_data = CustomUser.objects.get(username=username)
            if user_data.is_organizer:
                organizer = Organizer.objects.get(pk=user_data.is_organizer.id)
                login(request, user)
                if not organizer.event_id:
                    return HttpResponseRedirect("/dash/organizer/home/event-create/")
                else:           
                    return redirect('/dash/organizer/home/')    
                    #return HttpResponseRedirect("/dash/organizer/home")
            else:
                login(request, user)
                return redirect('/dash/home/')
        else:
            return Response('Incorrect data...', status=status.HTTP_400_BAD_REQUEST)
        
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserAllFieldsSerializer
    queryset = CustomUser
    permission_classes = [IsAuthenticated]