from django.urls import path
from . import views

urlpatterns = [
    path('create-outline/', views.CreateOutlineView.as_view()),
    path('delete-outline/<str:pk>/', views.DeleteOutlineView.as_view()),
    path('view-outlines/', views.OutlineView.as_view()),
    path('create-learningoutcome/', views.CreateLearningOutcomesView.as_view()),
    path('delete-learningoutcome/<str:pk>/', views.DeleteLearningOutcomeView.as_view()),
    path('view-learningoutcomes/', views.LearningOutcomesView.as_view()),
]