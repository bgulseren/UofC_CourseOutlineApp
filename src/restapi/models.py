from django.core.checks import messages
from django.db import models

# Create your models here.

class CourseBasicData(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    courseCode = models.TextField(blank=False, null=True)
    courseName = models.TextField(blank=False, null=True)
    courseDescription = models.TextField(blank=False, null=True)
    courseHours = models.TextField(blank=False, null=True)
    courseCalRef = models.TextField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class LearningOutcome(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    description = models.TextField(blank=False, null=True)
    gradAttribute = models.TextField(blank=False, null=True)
    instLevel = models.TextField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class Timetable(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    section = models.TextField(blank=False, null=True)
    days = models.TextField(blank=False, null=True)
    time = models.TextField(blank=False, null=True)
    location = models.TextField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class GradeComponent(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    component = models.TextField(blank=False, null=True)
    learningOutcomes = models.TextField(blank=False, null=True)
    weight = models.IntegerField(blank=False, null=True)

    # def __str__(self):
    #     return self.message