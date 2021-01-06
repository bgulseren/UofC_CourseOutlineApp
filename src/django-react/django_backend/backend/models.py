from django.db import models

# Course outline model
class outline(models.Model):
    text = models.CharField(max_length = 300)
    courseHours = models.IntegerField()
    courseCredits = models.IntegerField()
    calenderLink = models.CharField(max_length = 100)

# Learning outcomes model
class learningOutcomes(models.Model):
    text = models.CharField(max_length = 300)

# Final grade breakdown model
class gradeBreakdown(models.Model):
    component = models.CharField(max_length = 100)
    learningOutcomes = models.CharField(max_length = 100)
    weight = models.IntegerField()