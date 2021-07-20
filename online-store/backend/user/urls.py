from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login-view'),
    path('signup/', views.sign_up_view, name='signup-view'),
    path('info/', views.info, name='info'),
]
