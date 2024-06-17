from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from autentication.models import CustomUserManager, CustomUser
from autentication.models import Organizer
from rest_framework import status
from event.models import Events
from rest_framework.decorators import action


class MyCustomMixin:

    def perform_action_after(self, request):
        event = request.data['event']
        event = Events.objects.get(id=event)
        event.num_participants = len(UserEvents.objects.filter(event_id=event))
        event.save()
        return

class UserEventViewSet(MyCustomMixin, viewsets.ModelViewSet):
    serializer_class = UserEventSerializer
    queryset =  UserEvents.objects.all()
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        self.perform_action_after(request)   # Passa a request para o mixin
        return response

    @action(detail=False, methods=['post'])
    def delete_user_event(self, request, *args, **kwargs):
        event = request.data['event']
        user = request.user.pk
        instance = self.queryset.filter(event_id=event, user_id=user)
        self.perform_destroy(instance)
        self.perform_action_after(request)  
        return Response({'ok'}, status=status.HTTP_200_OK)