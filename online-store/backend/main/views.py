from django.http import JsonResponse
from django.shortcuts import render
from .models import Receipt, Category, Product


def product_view(request):
    if request.method == "POST":
        if 'create_new_product' in request.POST:
            name = request.POST.get('name')
            category_pk = request.POST.get('category')
            category = Category.objects.get(pk=category_pk)
            price = request.POST.get('price')
            try:
                price = int(price)
            except ValueError:
                return JsonResponse({'success': False, 'error': 'قیمت بایستی عدد صحیح باشد'}, safe=False)

            image_file = request.FILES['imageFile']
            Product(name=name, category=category, price=price, image=image_file).save()
            return JsonResponse({'success': True}, safe=False)

        return JsonResponse({'success': False, 'error': 'درخواست نا معتبر'}, safe=False)


def receipt_view(request):
    if request.method == "GET":
        receipts = Receipt.objects.filter(related_user=request.user)
        json_result = []
        for receipt in receipts:
            json_result.append({
                'trackingCode': receipt.tracking_code,
                'productName': receipt.product_name,
                'amount': "{:,} تومان".format(receipt.price),
                'address': receipt.buyer_address,
                'state': receipt.state
            })

        return JsonResponse(json_result, safe=False)


def categories_view(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        json_result = []
        for category in categories:
            json_result.append({
              'text': category.name,
              'value': category.pk
            })

        return JsonResponse(json_result, safe=False)
