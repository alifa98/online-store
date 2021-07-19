from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

from .models import User
from .utils import *


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        if 'login' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')

            if not login_is_valid(username, password):
                return JsonResponse({"success": False, 'error': 'فرمت اشتباه است'})
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"success": False, 'error': 'ایمیل یا پسورد اشتباه است'})
        if 'logout' in request.POST:
            logout(request)
            return JsonResponse({"success": True})

    if request.method == "GET":
        if 'is_authenticated' in request.GET:
            return JsonResponse({'is_authenticated': request.user.is_authenticated})


@csrf_exempt
def sign_up_view(request):
    if request.method == "POST":
        if 'signup' in request.POST:
            first_name = request.POST.get('first_name').strip()
            last_name = request.POST.get('last_name').strip()
            username = request.POST.get('username').strip()
            password = request.POST.get('password').strip()
            address = request.POST.get('address').strip()

            if signup_info_is_valid(first_name, last_name, username, password, address):
                user = User.objects.create_superuser(username=username, email=username, password=password,
                                                     address=address)
                user.save()

                # Try to login
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True, 'logged_in': True})

                return JsonResponse({'success': True, 'logged_in': False})

            else:
                return JsonResponse({'success': False, 'error': 'فرمت ورودی اشتباه است'})
