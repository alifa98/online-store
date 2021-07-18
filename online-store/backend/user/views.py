from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.core import serializers


def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False})

    if request.method == "GET":
        return JsonResponse(serializers.serialize('json', request.user))
