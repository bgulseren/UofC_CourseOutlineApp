from rest_framework  import serializers
from .models import outline, learningOutcomes, gradeBreakdown

#Python to Json serializers

class CreateOutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = outline
        fields = (['text', 'courseHours', 'courseCredits', 'calenderLink'])

class CreateLearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = learningOutcomes
        fields = (['text'])

class CreateGradeBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = gradeBreakdown
        fields = (['component', 'learningOutcomes', 'weight'])


#Json to python serializers

class OutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = outline
        fields = (['text', 'courseHours', 'courseCredits', 'calenderLink'])

class LearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = learningOutcomes
        fields = (['text'])

class GradeBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = gradeBreakdown
        fields = (['component', 'learningOutcomes', 'weight'])