from django.urls import path
from . import views

urlpatterns = [
    path('receipt/', views.receipt_view, name='receipt'),
    path('categories/', views.categories_view, name='receipt'),
    path('list/', views.get_filtered_products, name='products_list'),
    path('buy/', views.buy_view, name='buy_view'),
    path('', views.product_view, name='products'),
]
