from django.db import models


class Store(models.Model):
    owner_id = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=200)
    current_price_point = models.ForeignKey(
        'PricePoint', on_delete=models.SET_NULL, null=True, related_name="+"
    )
    store = models.ForeignKey(
        Store,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class PricePoint(models.Model):
    price_point = models.DecimalField(max_digits=12, decimal_places=4)
    alpha = models.DecimalField(max_digits=12, decimal_places=4)
    beta = models.DecimalField(max_digits=12, decimal_places=4)

    item = models.ForeignKey(
        Item,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "(item:" + str(self.item.id) + ") " + str(self.price_point)

class SalesLog(models.Model):
    item =  models.ForeignKey(
        'Item', on_delete=models.SET_NULL, null=True
    )
    price_point =  models.ForeignKey(
        'PricePoint', on_delete=models.SET_NULL, null=True
    )
    is_new = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)