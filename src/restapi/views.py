from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .serializers import *

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

# Course Basic Data viewset

class CourseBasicDataViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = CourseBasicData.objects.all() 
      
    # specify serializer to be used 
    serializer_class = CourseBasicDataSerializer 


@api_view(['GET', 'POST', 'DELETE'])
def courseBasicData_list(request):
    if request.method == 'GET':
        courseBasicDatas = CourseBasicData.objects.all()
        
        message = request.query_params.get('Message', None)
        if message is not None:
            courseBasicDatas = courseBasicDatas.filter(title__icontains=message)
        
        courseBasicDatas_serializer = CourseBasicDataSerializer(courseBasicDatas, many=True)
        return JsonResponse(courseBasicDatas_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        courseBasicData_data = JSONParser().parse(request)
        courseBasicData_serializer = CourseBasicDataSerializer(data=courseBasicData_data)
        if courseBasicData_serializer.is_valid():
            courseBasicData_serializer.save()
            return JsonResponse(courseBasicData_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(courseBasicData_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = CourseBasicData.objects.all().delete()
        return JsonResponse({'message': '{} CourseBasicDatas were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def courseBasicData_detail(request, pk):
    try: 
        courseBasicData = CourseBasicData.objects.get(pk=pk) 
    except CourseBasicData.DoesNotExist: 
        return JsonResponse({'message': 'The courseBasicData does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        courseBasicData_serializer = CourseBasicDataSerializer(courseBasicData) 
        return JsonResponse(courseBasicData_serializer.data) 
 
    elif request.method == 'PUT': 
        courseBasicData_data = JSONParser().parse(request) 
        courseBasicData_serializer = CourseBasicDataSerializer(courseBasicData, data=courseBasicData_data) 
        if courseBasicData_serializer.is_valid(): 
            courseBasicData_serializer.save() 
            return JsonResponse(courseBasicData_serializer.data) 
        return JsonResponse(courseBasicData_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        courseBasicData.delete() 
        return JsonResponse({'message': 'CourseBasicData was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def courseBasicData_list_published(request):
    courseBasicDatas = CourseBasicData.objects.filter(published=True)
        
    if request.method == 'GET': 
        courseBasicDatas_serializer = CourseBasicDataSerializer(courseBasicDatas, many=True)
        return JsonResponse(courseBasicDatas_serializer.data, safe=False)



# Learning Outcome viewset

class LearningOutcomeViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = LearningOutcome.objects.all() 
      
    # specify serializer to be used 
    serializer_class = LearningOutcomeSerializer 


@api_view(['GET', 'POST', 'DELETE'])
def learningOutcome_list(request):
    if request.method == 'GET':
        learningOutcomes = LearningOutcome.objects.all()
        
        message = request.query_params.get('Message', None)
        if message is not None:
            learningOutcomes = learningOutcomes.filter(title__icontains=message)
        
        learningOutcomes_serializer = LearningOutcomeSerializer(learningOutcomes, many=True)
        return JsonResponse(learningOutcomes_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        learningOutcome_data = JSONParser().parse(request)
        learningOutcome_serializer = LearningOutcomeSerializer(data=learningOutcome_data)
        if learningOutcome_serializer.is_valid():
            learningOutcome_serializer.save()
            return JsonResponse(learningOutcome_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(learningOutcome_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = LearningOutcome.objects.all().delete()
        return JsonResponse({'message': '{} LearningOutcomes were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def learningOutcome_detail(request, pk):
    try: 
        learningOutcome = LearningOutcome.objects.get(pk=pk) 
    except LearningOutcome.DoesNotExist: 
        return JsonResponse({'message': 'The learningOutcome does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        learningOutcome_serializer = LearningOutcomeSerializer(learningOutcome) 
        return JsonResponse(learningOutcome_serializer.data) 
 
    elif request.method == 'PUT': 
        learningOutcome_data = JSONParser().parse(request) 
        learningOutcome_serializer = LearningOutcomeSerializer(learningOutcome, data=learningOutcome_data) 
        if learningOutcome_serializer.is_valid(): 
            learningOutcome_serializer.save() 
            return JsonResponse(learningOutcome_serializer.data) 
        return JsonResponse(learningOutcome_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        learningOutcome.delete() 
        return JsonResponse({'message': 'LearningOutcome was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def learningOutcome_list_published(request):
    learningOutcomes = LearningOutcome.objects.filter(published=True)
        
    if request.method == 'GET': 
        learningOutcomes_serializer = LearningOutcomeSerializer(learningOutcomes, many=True)
        return JsonResponse(learningOutcomes_serializer.data, safe=False)

# Timetable Viewset

class TimetableViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = Timetable.objects.all() 
      
    # specify serializer to be used 
    serializer_class = TimetableSerializer 


@api_view(['GET', 'POST', 'DELETE'])
def timetable_list(request):
    if request.method == 'GET':
        timetables = Timetable.objects.all()
        
        message = request.query_params.get('Message', None)
        if message is not None:
            timetables = timetables.filter(title__icontains=message)
        
        timetables_serializer = TimetableSerializer(timetables, many=True)
        return JsonResponse(timetables_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        timetable_data = JSONParser().parse(request)
        timetable_serializer = TimetableSerializer(data=timetable_data)
        if timetable_serializer.is_valid():
            timetable_serializer.save()
            return JsonResponse(timetable_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(timetable_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Timetable.objects.all().delete()
        return JsonResponse({'message': '{} Timetables were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def timetable_detail(request, pk):
    try: 
        timetable = Timetable.objects.get(pk=pk) 
    except Timetable.DoesNotExist: 
        return JsonResponse({'message': 'The timetable does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        timetable_serializer = TimetableSerializer(timetable) 
        return JsonResponse(timetable_serializer.data) 
 
    elif request.method == 'PUT': 
        timetable_data = JSONParser().parse(request) 
        timetable_serializer = TimetableSerializer(timetable, data=timetable_data) 
        if timetable_serializer.is_valid(): 
            timetable_serializer.save() 
            return JsonResponse(timetable_serializer.data) 
        return JsonResponse(timetable_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        timetable.delete() 
        return JsonResponse({'message': 'Timetable was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def timetable_list_published(request):
    timetables = Timetable.objects.filter(published=True)
        
    if request.method == 'GET': 
        timetables_serializer = TimetableSerializer(timetables, many=True)
        return JsonResponse(timetables_serializer.data, safe=False)


# Grade Component Viewset

class GradeComponentViewSet(viewsets.ModelViewSet): 
    # define queryset 
    queryset = GradeComponent.objects.all() 
      
    # specify serializer to be used 
    serializer_class = GradeComponentSerializer 


@api_view(['GET', 'POST', 'DELETE'])
def gradeComponent_list(request):
    if request.method == 'GET':
        gradeComponents = GradeComponent.objects.all()
        
        message = request.query_params.get('Message', None)
        if message is not None:
            gradeComponents = gradeComponents.filter(title__icontains=message)
        
        gradeComponents_serializer = GradeComponentSerializer(gradeComponents, many=True)
        return JsonResponse(gradeComponents_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        gradeComponent_data = JSONParser().parse(request)
        gradeComponent_serializer = GradeComponentSerializer(data=gradeComponent_data)
        if gradeComponent_serializer.is_valid():
            gradeComponent_serializer.save()
            return JsonResponse(gradeComponent_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(gradeComponent_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = GradeComponent.objects.all().delete()
        return JsonResponse({'message': '{} GradeComponents were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def gradeComponent_detail(request, pk):
    try: 
        gradeComponent = GradeComponent.objects.get(pk=pk) 
    except GradeComponent.DoesNotExist: 
        return JsonResponse({'message': 'The gradeComponent does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        gradeComponent_serializer = GradeComponentSerializer(gradeComponent) 
        return JsonResponse(gradeComponent_serializer.data) 
 
    elif request.method == 'PUT': 
        gradeComponent_data = JSONParser().parse(request) 
        gradeComponent_serializer = GradeComponentSerializer(gradeComponent, data=gradeComponent_data) 
        if gradeComponent_serializer.is_valid(): 
            gradeComponent_serializer.save() 
            return JsonResponse(gradeComponent_serializer.data) 
        return JsonResponse(gradeComponent_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        gradeComponent.delete() 
        return JsonResponse({'message': 'GradeComponent was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def gradeComponent_list_published(request):
    gradeComponents = GradeComponent.objects.filter(published=True)
        
    if request.method == 'GET': 
        gradeComponents_serializer = GradeComponentSerializer(gradeComponents, many=True)
        return JsonResponse(gradeComponents_serializer.data, safe=False)