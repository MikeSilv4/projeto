from rest_framework import serializers
from .models import UserEvents


class UserEventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserEvents
        fields = '__all__'
