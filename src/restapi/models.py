from django.core.checks import messages
from django.db import models

# Create your models here.

class Echo(models.Model):
    message    = models.TextField(blank=True, null=True)

    # def __str__(self):
    #     return self.message