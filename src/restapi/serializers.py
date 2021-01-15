from django.contrib.auth.models import User, Group
from rest_framework import serializers

# import model from models.py 
from .models import LearningOutcome, Timetable, CourseBasicData, GradeComponent


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CourseBasicDataSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = CourseBasicData
        fields = ['id', 'courseCode', 'courseName', 'courseDescription', 'courseHours', 'courseCalRef']

class LearningOutcomeSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = LearningOutcome
        fields = ['id', 'description', 'gradAttribute', 'instLevel']

class TimetableSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = Timetable
        fields = ['id', 'section', 'days', 'time', 'location']

class GradeComponentSerializer(serializers.HyperlinkedModelSerializer): 
    # specify model and fields 
    class Meta: 
        model = GradeComponent
        fields = ['id', 'component', 'learningOutcomes', 'weight'] 
