from django.shortcuts import render
from django.http import HttpResponse

from .models import User

def index(request):
    user_list = User.objects.order_by('name')[:5]
    context = {'user_list': user_list}
    return render(request, 'login/index.html', context)