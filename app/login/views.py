from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
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

# ======================================================


@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        data = User.objects.all()

        serializer = UserSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def users_detail(request, pk):
    try:
        student = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserSerializer(
            student, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':

        print(request.data)

        username = request.data['username']
        password = request.data['password']

        print(username)
        print(password)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response("succeeded")
        else:
            return Response("failed")