"""webproject607 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from pages.views import home_view
from restapi import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'api/instructors', views.InstructorViewSet)
router.register(r'api/courses', views.CourseViewSet)
router.register(r'api/learningOutcomes', views.LearningOutcomeViewSet)
router.register(r'api/timetables', views.TimetableViewSet)
router.register(r'api/courseInstructors', views.CourseInstructorViewSet)
router.register(r'api/gradeComponents', views.GradeComponentViewSet)
router.register(r'api/textbooks', views.TextbookViewSet)
router.register(r'api/gradeBreakdowns', views.GradeBreakdownViewSet) 

urlpatterns = [
    # url(r'^', include('restapi.urls')),
    
    path('', home_view, name='home'),
    path('home', home_view, name='home'),
    path('admin/', admin.site.urls),

    # Wire up our API using automatic URL routing.
    # Additionally, we include login URLs for the browsable API.
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
