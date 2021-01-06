from django.urls import path
from . import views

urlpatterns = [
    path('api/create-outline/', views.CreateOutlineView.as_view()),
    path('api/create-learningoutcome/', views.CreateLearningOutcomesView.as_view()),
]