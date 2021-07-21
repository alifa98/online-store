from django.http import JsonResponse, QueryDict
from django.contrib.auth import authenticate, login, logout

from .models import User
from .utils import *


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
        if 'is_admin' in request.GET:
            return JsonResponse({'is_admin': request.user.is_superuser})


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


def info(request):
    if request.method == "GET":
        result = {
            'firstName': request.user.first_name,
            'lastName': request.user.last_name,
            'address': request.user.address,
            'balance': request.user.credit
        }
        return JsonResponse(result)

    if request.method == "POST":
        if 'increase_credit' in request.POST:
            request.user.credit += 10000
            request.user.save()
            return JsonResponse({'success': True})

    if request.method == "PUT":
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'error': 'خطا در ورود. ابتدا بایستی در سایت وارد شوید'})

        put = QueryDict(request.body)
        first_name = put.get('first_name')
        last_name = put.get('last_name')
        password = put.get('password')
        address = put.get('address')

        if first_name is not None and 0 < len(first_name) < 255:
            request.user.first_name = first_name
        else:
            return JsonResponse({'success': False, 'error': 'خطا در نام'})

        if last_name is not None and 0 < len(last_name) < 255:
            request.user.last_name = last_name
        else:
            return JsonResponse({'success': False, 'error': 'خطا در نام خانوادگی'})

        if password is not None and 8 <= len(password) < 255 and password_is_valid(password):
            request.user.set_password(password)
        elif len(password) > 0:
            return JsonResponse({'success': False, 'error': 'خطا در رمز عبور'})

        if address is not None and 0 < len(address) <= 1000:
            request.user.address = address
        else:
            return JsonResponse({'success': False, 'error': 'خطا در آدرس'})

        request.user.save()

        if len(password) > 0:  # User has changed the password
            login(request, request.user)  # stay connected
        return JsonResponse({'success': True})



