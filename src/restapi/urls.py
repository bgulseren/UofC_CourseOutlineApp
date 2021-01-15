from django.conf.urls import url 
from restapi import views 
 
urlpatterns = [
    url(r'^api/courses$', views.courseBasicData_list),
    url(r'^api/courses/(?P<pk>[0-9]+)$', views.courseBasicData_detail),
    url(r'^api/courses/published$', views.courseBasicData_list_published),

    url(r'^api/learningOutcomes$', views.learningOutcome_list),
    url(r'^api/learningOutcomes/(?P<pk>[0-9]+)$', views.learningOutcome_detail),
    url(r'^api/learningOutcomes/published$', views.learningOutcome_list_published),

    url(r'^api/timetables$', views.timetable_list),
    url(r'^api/timetables/(?P<pk>[0-9]+)$', views.timetable_detail),
    url(r'^api/timetables/published$', views.timetable_list_published),

    url(r'^api/gradeComponents$', views.gradeComponent_list),
    url(r'^api/gradeComponents/(?P<pk>[0-9]+)$', views.gradeComponent_detail),
    url(r'^api/gradeComponents/published$', views.gradeComponent_list_published)
]
