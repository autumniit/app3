from rest_framework import serializers
from core.models import PriceModel, Store


class PriceModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = PriceModel
        fields = ['name']

class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ['id', 'name', 'owner_id']