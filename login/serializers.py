from rest_framework import serializers
from autentication.models import CustomUser


class UserAllFieldsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'cpf', 'born_date']
