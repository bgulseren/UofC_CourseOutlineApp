from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

from rest_framework import renderers

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .serializers import *

from rest_framework.decorators import api_view, action

from rest_framework import generics

from django_filters.rest_framework import DjangoFilterBackend

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

class InstructorViewSet(viewsets.ModelViewSet): 
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['phone', 'first_name']

class CourseViewSet(viewsets.ModelViewSet): 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['instructor']

class LearningOutcomeViewSet(viewsets.ModelViewSet): 
    queryset = LearningOutcome.objects.all()
    serializer_class = LearningOutcomeSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('course_id')

class TimetableViewSet(viewsets.ModelViewSet): 
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('course_id')


class GradeComponentViewSet(viewsets.ModelViewSet): 
    queryset = GradeComponent.objects.all()
    serializer_class = GradeComponentSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('course_id')

class TextbookViewSet(viewsets.ModelViewSet): 
    queryset = Textbook.objects.all()
    serializer_class = TextbookSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('course_id')
