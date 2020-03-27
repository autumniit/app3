from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view

from django.shortcuts import render

# Create your views here.
@api_view(['GET', 'POST'])
def pricemodels_list(request):
    if request.method == 'GET':
        data = PriceModel.objects.all()

        serializer = PriceModelSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PriceModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)