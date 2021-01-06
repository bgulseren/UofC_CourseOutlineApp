from django.shortcuts import render
from .models import outline, learningOutcomes, gradeBreakdown
from .serializers import CreateOutlineSerializer, CreateLearningOutcomeSerializer, CreateGradeBreakdownSerializer
from .serializers import OutlineSerializer, LearningOutcomeSerializer, GradeBreakdownSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response


class OutlineView(generics.ListAPIView):
    queryset = outline.objects.all()
    serializer_class = OutlineSerializer

class CreateOutlineView(APIView):
    serializer_class = CreateOutlineSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            text = serializer.data.get('text')
            courseHours = serializer.data.get('courseHours')
            courseCredits = serializer.data.get('courseCredits')
            calenderLink = serializer.data.get('calenderLink')
            courseOutline = outline(text = text, courseHours = courseHours, courseCredits = courseCredits, calenderLink = calenderLink)
            courseOutline.save()
        return Response(OutlineSerializer(courseOutline).data, status = status.HTTP_200_OK)

class LearningOutcomesView(generics.ListAPIView):
    queryset = learningOutcomes.objects.all()
    serializer_class = LearningOutcomeSerializer

class CreateLearningOutcomesView(APIView):
    serializer_class = CreateLearningOutcomeSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            text = serializer.data.get('text')
            learningOutcome = learningOutcomes(text = text)
            learningOutcome.save()
        return Response(LearningOutcomeSerializer(learningOutcome).data, status = status.HTTP_200_OK)