from django.urls import path
from . import views

urlpatterns = [
    path('receipt/', views.receipt_view, name='receipt'),
]
