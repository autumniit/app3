from django.db import models
# from django.contrib.postgres.fields import ArrayField


class PriceModel(models.Model):
    name = models.CharField(max_length=200)
    # price_points = ArrayField(
    #     models.IntegerField(null=True, blank=True),
    #     size=5,
    #     default=list,
    #     null=True
    # )

    def __str__(self):
        return self.name

class Store(models.Model):
    name = models.CharField(max_length=200)
    owner_id = models.CharField(max_length=200)

    def __str__(self):
        return self.name