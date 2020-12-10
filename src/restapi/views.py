from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .serializers import *
from .models import Product

from rest_framework.decorators import api_view


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# create a viewset
class ProductViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = Product.objects.all() 
      
    # specify serializer to be used 
    serializer_class = ProductSerializer

class EchoViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = Echo.objects.all() 
      
    # specify serializer to be used 
    serializer_class = EchoSerializer 


@api_view(['GET', 'POST', 'DELETE'])
def echo_list(request):
    if request.method == 'GET':
        echos = Echo.objects.all()
        
        message = request.query_params.get('Message', None)
        if message is not None:
            echos = echos.filter(title__icontains=message)
        
        echos_serializer = EchoSerializer(echos, many=True)
        return JsonResponse(echos_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        echo_data = JSONParser().parse(request)
        echo_serializer = EchoSerializer(data=echo_data)
        if echo_serializer.is_valid():
            echo_serializer.save()
            return JsonResponse(echo_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(echo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Echo.objects.all().delete()
        return JsonResponse({'message': '{} Echos were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def echo_detail(request, pk):
    try: 
        echo = Echo.objects.get(pk=pk) 
    except Echo.DoesNotExist: 
        return JsonResponse({'message': 'The echo does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        echo_serializer = EchoSerializer(echo) 
        return JsonResponse(echo_serializer.data) 
 
    elif request.method == 'PUT': 
        echo_data = JSONParser().parse(request) 
        echo_serializer = EchoSerializer(echo, data=echo_data) 
        if echo_serializer.is_valid(): 
            echo_serializer.save() 
            return JsonResponse(echo_serializer.data) 
        return JsonResponse(echo_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        echo.delete() 
        return JsonResponse({'message': 'Echo was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def echo_list_published(request):
    echos = Echo.objects.filter(published=True)
        
    if request.method == 'GET': 
        echos_serializer = EchoSerializer(echos, many=True)
        return JsonResponse(echos_serializer.data, safe=False)