from rest_framework  import serializers
from .models import outline, learningOutcomes, gradeBreakdown

#Python to Json serializers

class CreateOutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = outline
        fields = '__all__'

class CreateLearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = learningOutcomes
        fields = '__all__'

class CreateGradeBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = gradeBreakdown
        fields = '__all__'


#Json to python serializers

class OutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = outline
        fields = '__all__'

class LearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = learningOutcomes
        fields = '__all__'

class GradeBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = gradeBreakdown
        fields = '__all__'