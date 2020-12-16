from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view(request, *args, **kwargs): # *args, **kwargs
    return HttpResponse("<h1>Main Page - ENSF 607 Project</h1>") #string of html code
