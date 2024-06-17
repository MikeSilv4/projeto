from rest_framework import serializers
from autentication.models import CustomUser
from autentication.models import Organizer


class OrganizerAllFieldsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Organizer
        fields = '__all__'
