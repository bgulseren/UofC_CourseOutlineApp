from django.contrib.auth.models import User, Group
from rest_framework import serializers

# import model from models.py 
from .models import Product, Echo


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ProductSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = Product
        fields = ('title', 'description', 'price', 'summary') 

class EchoSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = Echo
        fields = ('echoid','message') 
