from rest_framework import serializers
from core.models import PriceModel


class PriceModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = PriceModel
        fields = ['name', 'username', 'password']