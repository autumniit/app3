from django.contrib import admin
from core.models import Store, Item, PricePoint

# Register your models here.

admin.site.register(Store)
admin.site.register(Item)
admin.site.register(PricePoint)