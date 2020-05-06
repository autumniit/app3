"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Store REST API
    re_path(r'^api/stores/$', views.stores_list),
    re_path(r'^api/stores/(?P<store_id>[0-9]+)$', views.stores_detail),

    # Item REST API
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/$', views.items_list),
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)$', views.items_detail),

    # PricePoint REST API
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)/price_points/$', views.price_points_list),
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)/price_points/(?P<price_point_id>[0-9]+)$', views.price_points_detail),

    # APIs
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)/recalculate$', views.recalculate),
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)/thompson_graph$', views.thompson_graph),
    re_path(r'^api/stores/(?P<store_id>[0-9]+)/items/(?P<item_id>[0-9]+)/priceprop_pie$', views.priceprop_pie),
]
