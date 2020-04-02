from rest_framework.response import Response
from .serializers import StoreSerializer
from .models import Store
from rest_framework import status
from rest_framework.decorators import api_view

from django.shortcuts import render

@api_view(['GET', 'POST'])
def stores_list(request):
    if request.method == 'GET':
        data = Store.objects.all()

        serializer = StoreSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def stores_detail(request, pk):
    try:
        student = Store.objects.get(pk=pk)
        
    except Store.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StoreSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)