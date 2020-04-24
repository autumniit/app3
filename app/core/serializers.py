from rest_framework import serializers
from core.models import Store, Item, PricePoint, SalesLog

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'description', 'owner_id']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'current_price_point', 'store']

class PricePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricePoint
        fields = ['id', 'price_point', 'alpha', 'beta', 'item']

class SalesLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesLog
        fields = ['id', 'item', 'price_point']