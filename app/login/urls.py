from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('', views.index, name='index'),
    path('resolve_login/', views.resolve_loginV2, name='resolve_login'),
]
