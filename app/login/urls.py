from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('', views.index, name='index'),
    path('resolve_login/', views.resolve_login, name='resolve_login'),
    path('result/', views.result, name='result')
]