from django.db import models

class PriceModel(models.Model):
    name = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    def __str__(self):
            return self.username
