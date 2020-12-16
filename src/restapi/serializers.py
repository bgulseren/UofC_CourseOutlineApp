from django.contrib.auth.models import User, Group
from rest_framework import serializers

# import model from models.py 
from .models import Echo


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class EchoSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = Echo
        fields = ['message'] 
