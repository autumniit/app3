from rest_framework.response import Response
from .serializers import StoreSerializer, ItemSerializer, PricePointSerializer
from .models import Store, Item, PricePoint, SalesLog
from rest_framework import status
from rest_framework.decorators import api_view

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from decimal import Decimal
import json

# MODEL
from .thompson_util import get_updated_params, get_sample_demands_from_model, get_optimal_price_point_idx, get_thompson_graph_parameters


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
def stores_detail(request, store_id):
    try:
        student = Store.objects.get(pk=store_id)

    except Store.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StoreSerializer(
            student, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def items_list(request, store_id):
    if request.method == 'GET':
        data = Item.objects.filter(store=store_id)

        serializer = ItemSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def items_detail(request, store_id, item_id):
    try:
        student = Item.objects.get(pk=item_id)

    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ItemSerializer(
            student, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def price_points_list(request, store_id, item_id):
    if request.method == 'GET':
        data = PricePoint.objects.filter(item=item_id)

        serializer = PricePointSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PricePointSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def price_points_detail(request, store_id, item_id, price_point_id):
    try:
        student = PricePoint.objects.get(pk=price_point_id)

    except PricePoint.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = PricePointSerializer(
            student, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# MODEL
# @csrf_exempt
@api_view(['POST'])
def recalculate(request, store_id, item_id):


    print("___________________________")
    print("___Recalculation Details___")

    # TODO: Add try catch blocks

    item = get_object_or_404(Item, pk=item_id)

    # get new_demand from request obj
    # Consider changing to different post field
    # observed_demand = Decimal(request.POST["demand"])
    observed_demand = Decimal(request.data["demand"])
    print("observed demand: ", observed_demand)

    # attempt to update the old price point's parameters with new demand observed
    price_point = item.current_price_point

    if price_point != None:  # both for initialization and if the previous optimal gets removed
        old_alpha = price_point.alpha
        old_beta = price_point.beta

        new_alpha, new_beta = get_updated_params(
            observed_demand, old_alpha, old_beta)

        # update price_point table with new_alpha, new_beta
        price_point.alpha = new_alpha
        price_point.beta = new_beta

        price_point.save()

    # ===================================

    # get p_theta from db
    p_theta = item.pricepoint_set.all().values()
    demands = [Decimal(d) for d in get_sample_demands_from_model(p_theta)]
    print("demands:", ["%.2f" % demand for demand in demands])

    optimal_idx = get_optimal_price_point_idx(p_theta, demands)
    print("optimal price idx: ", optimal_idx)

    # set current_price of the item to price_point[optimal_idx]
    item.current_price_point = get_object_or_404(
        PricePoint, pk=optimal_idx)  # ???
    item.save()

    print("new price: ", item.current_price_point.price_point)

    print("___________________________")
    print("___________________________")

    return HttpResponse(item.current_price_point.price_point)

# to get the updated price, simply get the item details as normal


@csrf_exempt
def create_sales_log(request, store_id, item_id):
    item = get_object_or_404(Item, pk=item_id)
    price_point = item.current_price_point
    log = SalesLog(item=item, price_point=price_point)
    log.save()

    return HttpResponse("success!")  # print status text


@csrf_exempt
def thompson_graph(request, store_id, item_id):
    item = get_object_or_404(Item, pk=item_id)
    price_points = item.pricepoint_set.all().values()
    sorted_price_points = sorted(
        price_points, key=lambda price_point: price_point["price_point"])

    result = list(map(get_thompson_graph_parameters, sorted_price_points))

    return JsonResponse(result, safe=False)
