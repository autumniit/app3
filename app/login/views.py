from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from django.contrib.auth import authenticate, login

from .models import User

def index(request):
    user_list = User.objects.order_by('name')[:5]
    context = {'user_list': user_list}
    return render(request, 'login/index.html', context)

def resolve_login(request):
    try:
        user = User.objects.get(username=request.POST['username'])
    except:
        return HttpResponse('failed')


    if request.POST['password'] == user.password:
        return HttpResponse('succeeded')
    else:
        return HttpResponse('failed')


def resolve_loginV2(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse('V2: succeeded')
    else:
        print("Failed")
        return HttpResponse('V2: failed')