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


def get_products_generic(request, perPage, currentPage, category_pk, search_text, sort_by, maxPrice):

    products = Product.objects.all()

    if maxPrice is not None:
        products = products.filter(price__lte=maxPrice)

    if category_pk is not None:
        products = Product.objects.filter(category=category_pk)

    if search_text is not None:
        products = products.filter(name__icontains=search_text)

    if sort_by is not None:
        products = products.order_by(sort_by).reverse()

    if perPage is None or perPage is None:
        begin = 0
        perPage = 10
    else:
        begin = ((currentPage - 1) * perPage)

    presented_in_list = products
    if(begin + perPage < products.count()):
        presented_in_list = products[begin:begin + perPage]

    json_result = []
    products_json = []
    for product in presented_in_list:
        products_json.append({
            'id': product.pk,
            'name': product.name,
            'price': product.price,
            'category': product.category.name,
            'image': product.image.url,
            'soldAmount': product.sold_amount,
            'availableAmount': product.available_amount
        })

    json_result.append({
        "products": products_json,
        "count": len(products),
        "begin": begin
    })

    return JsonResponse(json_result, safe=False)


def get_filtered_products(request):
    if request.method == "POST":
        return get_products_generic(request, int(request.POST.get('perPage')), int(request.POST.get('currentPage')), request.POST.get('category'), request.POST.get('name'), request.POST.get('sortBy'), request.POST.get('maxPrice'))


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
