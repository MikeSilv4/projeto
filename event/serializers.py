from rest_framework import serializers
from .models import Events


class EventAllFieldsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Events
        fields = '__all__'
