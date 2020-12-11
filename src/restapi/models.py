from django.core.checks import messages
from django.db import models

# Create your models here.
class Product(models.Model):
    title       = models.CharField(max_length=120) #max_length = required
    description = models.TextField(blank=True, null=True)
    price       = models.DecimalField(decimal_places=2, max_digits=10000)
    summary     = models.TextField()
    brand       = models.TextField(default="")

    def __str__(self):
        return self.title

class Echo(models.Model):
    echoid     = models.TextField(blank=True, null=True)
    message    = models.TextField(blank=True, null=True)

    # def __str__(self):
    #     return self.message