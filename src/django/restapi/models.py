from django.core.checks import messages
from django.db import models

# Create your models here.

class Instructor(models.Model):
    id = models.AutoField(primary_key=True, blank=False, null=False)
    first_name = models.TextField(blank=False, null=False)
    last_name = models.TextField(blank=False, null=False)
    phone = models.TextField(blank=False, null=True)
    office = models.TextField(blank=False, null=True)
    email = models.EmailField(blank=False, null=False)

class Course(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    code = models.TextField(blank=False, null=True)
    name = models.TextField(blank=False, null=True)
    description = models.TextField(blank=False, null=True)
    hours = models.TextField(blank=False, null=True)
    calendar_ref = models.TextField(blank=False, null=True)
    grade_breakdown = models.TextField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class LearningOutcome(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    description = models.TextField(blank=False, null=True)
    gradAttribute = models.TextField(blank=False, null=True)
    instLevel = models.TextField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class Timetable(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    # instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    instructor_type = models.TextField(blank=False, null=True)
    section = models.TextField(blank=False, null=True)
    section_type = models.TextField(blank=False, null=True)
    days = models.TextField(blank=False, null=True)
    time = models.TextField(blank=False, null=True)
    location = models.TextField(blank=False, null=True)
    hoursPerWeek = models.IntegerField(blank=False, null=True)
    studentsPerInstructor = models.TextField(blank=False, null=True)
    # def __str__(self):
    #     return self.message

class GradeComponent(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    component = models.TextField(blank=False, null=True)
    learningOutcomes = models.TextField(blank=False, null=True)
    weight = models.IntegerField(blank=False, null=True)

    # def __str__(self):
    #     return self.message

class Textbook(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.TextField(blank=False, null=True)
    authors = models.TextField(blank=False, null=True)
    edition = models.TextField(blank=False, null=True)
    year = models.IntegerField(blank=False, null=True)
    publisher = models.TextField(blank=False, null=True)
    is_recommended = models.TextField(blank=False, null=True)
    # def __str__(self):
    #     return self.message