from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from django.middleware.csrf import get_token


def login_view(request):
    if request.method == "POST":
        if 'login' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"success": False})
        if 'logout' in request.POST:
            logout(request)
            return JsonResponse({"success": True})

    if request.method == "GET":
        if 'is_authenticated' in request.GET:
            return JsonResponse({'is_authenticated': request.user.is_authenticated})


