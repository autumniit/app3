from rest_framework import serializers
from core.models import Store, Item, PricePoint

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'description', 'owner_id']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'current_price', 'store']

class PricePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricePoint
        fields = ['id', 'price_point', 'demand', 'item']


#TODO: Add the rest of the serializers