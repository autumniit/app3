from rest_framework import serializers
from login.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['name', 'username', 'password']