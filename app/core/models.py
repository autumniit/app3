from django.db import models

class Store(models.Model):
    owner_id = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=200)
    current_price = models.DecimalField(max_digits=12, decimal_places=4)
    store = models.ForeignKey(
        Store, 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

class PricePoint(models.Model):
    price_point = models.DecimalField(max_digits=12, decimal_places=4)
    demand = models.DecimalField(max_digits=12, decimal_places=4)
    item = models.ForeignKey(
        Item, 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.price_point