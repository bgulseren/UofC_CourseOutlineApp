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
    day1 = models.TextField(blank=False, null=True)
    day2 = models.TextField(blank=False, null=True)
    start_time = models.TextField(blank=False, null=True)
    end_time = models.TextField(blank=False, null=True)
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

class GradeBreakdown(models.Model):
    id = models.AutoField(primary_key=True, blank=True, null=False)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    ap = models.IntegerField(blank=False, null=True)
    an = models.IntegerField(blank=False, null=True)
    am = models.IntegerField(blank=False, null=True)
    bp = models.IntegerField(blank=False, null=True)
    bn = models.IntegerField(blank=False, null=True)
    bm = models.IntegerField(blank=False, null=True)
    cp = models.IntegerField(blank=False, null=True)
    cn = models.IntegerField(blank=False, null=True)
    cm = models.IntegerField(blank=False, null=True)
    dp = models.IntegerField(blank=False, null=True)
    dn = models.IntegerField(blank=False, null=True)
    # def __str__(self):
    #     return self.message