from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view(request, *args, **kwargs): # *args, **kwargs
    print(request.user)
    print(args)
    print(kwargs)
    return HttpResponse("<h1>Hello World</h1>") #string of html code
