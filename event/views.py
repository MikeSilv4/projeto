from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from autentication.models import CustomUserManager, CustomUser
from autentication.models import Organizer
from rest_framework import status
import datetime
from home.models import UserEvents
from rest_framework.decorators import action

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventAllFieldsSerializer
    queryset =  Events.objects.filter(final_date__gte=datetime.date.today())
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = EventAllFieldsSerializer(data=data)
        
        if serializer.is_valid():
            event_instance = serializer.save()
            user_instance = CustomUser.objects.filter(pk=request.user.pk).first()
            organizer_instance = Organizer.objects.filter(pk=user_instance.is_organizer.pk).first()
            organizer_instance.event_id = event_instance
            organizer_instance.save()

            return Response({'data' : serializer.data}, status=status.HTTP_200_OK)
        
        return Response({'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST) 

    @action(detail=False, methods=['get'])
    def user_events(self, request, *args, **kwargs):
        user_events = UserEvents.objects.filter(user_id=request.user.pk)
        user_events = [i.event_id for i in user_events]
        events = self.queryset.filter(pk__in=user_events)
        serializer = self.serializer_class(events, many=True)

        return Response({'data' : serializer.data}, status=status.HTTP_200_OK)