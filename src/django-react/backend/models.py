from django.db import models

# Course outline model
class outline(models.Model):
    text = models.CharField(max_length = 300)

# Learning outcomes model
class learningOutcomes(models.Model):
    text = models.CharField(max_length = 100)

# Final grade breakdown model
class gradeBreakdown(models.Model):
    gradingComponent = models.CharField(max_lenght = 50)
    learningOutcomes = models.CharField(max_lenght = 20)
    weight = models.IntegerField()