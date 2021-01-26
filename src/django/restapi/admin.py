from django.contrib import admin

from .models import *

admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(LearningOutcome)
admin.site.register(Timetable)
admin.site.register(GradeComponent)
admin.site.register(Textbook)
admin.site.register(GradeBreakdown)

# Register your models here.
