from django.contrib import admin

from .models import LearningOutcome, Timetable, CourseBasicData

admin.site.register(LearningOutcome)
admin.site.register(Timetable)
admin.site.register(CourseBasicData)

# Register your models here.
