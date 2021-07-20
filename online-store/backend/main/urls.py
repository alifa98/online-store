from django.urls import path
from . import views

urlpatterns = [
    path('receipt/', views.receipt_view, name='receipt'),
    path('categories/', views.categories_view, name='receipt'),
    path('', views.product_view, name='products'),
]
