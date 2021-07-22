from django.http import JsonResponse
from .models import Receipt, Category, Product
from django.core.exceptions import ObjectDoesNotExist
import secrets


def product_view(request):
    if request.method == "POST":
        if 'edit_product' in request.POST:
            print(request.POST)
            product_id = request.POST.get('id')
            name = request.POST.get('productName')
            category = request.POST.get('category')
            price = request.POST.get('price')
            available_amount = request.POST.get('availableAmount')
            image_file = request.FILES.get('imageFile')

            product = Product.objects.get(id=product_id)
            if len(name) > 0 and len(category) > 0 and int(price) >= 0 and int(available_amount) >= 0:
                product.name = name
                product.category = Category.objects.get(pk=category)
                product.price = int(price)
                product.available_amount = available_amount
                if image_file:
                    product.image = image_file
                product.save()

                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'error': 'خطا در ویرایش کالا'})
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


def get_products_generic(request, perPage, currentPage, categories, search_text, sort_by, maxPrice):

    products = Product.objects.all()

    if maxPrice is not None and maxPrice != '':
        products = products.filter(price__lte=maxPrice)

    if categories is not None and len(categories) > 0:
        categories_pk_list = [int(x.strip()) for x in categories.strip('][').split(',')]
        products = products.filter(category__id__in=categories_pk_list)

    if search_text is not None and maxPrice != '':
        products = products.filter(name__icontains=search_text)

    if sort_by is not None and maxPrice != '':
        if sort_by == 'price_reverse':
            products = products.order_by('price')
        else:
            products = products.order_by(sort_by).reverse()
    else:
        products = products.order_by("sold_amount").reverse()

    if perPage is None or perPage is None:
        begin = 0
        perPage = 10
    else:
        begin = ((currentPage - 1) * perPage)

    presented_in_list = products
    if(begin < products.count()):
        presented_in_list = products[begin:begin + perPage]

    json_result = []
    products_json = []
    for product in presented_in_list:
        products_json.append({
            'id': product.pk,
            'name': product.name,
            'price': product.price,
            'category': product.category.name,
            'imgAddress': product.image.url,
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
        if request.user.is_anonymous:
            return JsonResponse({'success': False, 'error': 'بایستی ابتدا وارد سایت شوید.'}, safe=False)

        if 'all' in request.GET:
            if request.user.is_superuser:  # admin permission
                receipts = Receipt.objects.all()
            else:
                return JsonResponse({'success': False, 'error': 'شما دسترسی ندارید'}, safe=False)
        elif 'search' in request.GET:
            if request.user.is_superuser:
                search_value = request.GET.get('search')
                receipts = Receipt.objects.filter(tracking_code__icontains=search_value)
            else:
                return JsonResponse({'success': False, 'error': 'شما دسترسی ندارید'}, safe=False)
        else:
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
        json_result = make_categories()

        return JsonResponse(json_result, safe=False)

    if request.method == 'POST':
        if 'delete_category' in request.POST:
            category_pk = request.POST.get('delete_category')
            try:
                selected_category = Category.objects.get(pk=category_pk)
                if selected_category.name == 'دسته بندی نشده':
                    return JsonResponse({'success': False, 'error': 'امکان حذف این دسته بندی موجود نیست'})
                selected_category.delete()
                return JsonResponse({'success': True})
            except ObjectDoesNotExist:
                return JsonResponse({'success': False, 'error': 'دسته بندی موجود نیست'})

        if 'edit_category' in request.POST:
            category_pk = request.POST.get('edit_category')
            new_name = request.POST.get('new_name')
            try:
                selected_category = Category.objects.get(pk=category_pk)
                if selected_category.name == 'دسته بندی نشده':
                    return JsonResponse({'success': False, 'error': 'امکان تغییر این دسته بندی موجود نیست'})
                if len(new_name) > 0:
                    if Category.objects.filter(name=new_name).count() == 0:
                        selected_category.name = new_name
                        selected_category.save()
                        return JsonResponse({'success': True})
                    else:
                        return JsonResponse({'success': False,
                                             'error': 'دسته بندی ای با نام مورد نظر در حال حاضر موجود است.'})
                else:
                    return JsonResponse({'success': False, 'error': 'نام جدید نبایستی خالی باشد'})
            except ObjectDoesNotExist:
                return JsonResponse({'success': False, 'error': 'دسته بندی موجود نیست'})


def make_categories():
    categories = Category.objects.all()
    json_result = []
    for category in categories:
        json_result.append({
            'text': category.name,
            'id': category.pk
        })
    return json_result


def buy(user, prodcutId, count):
    product = Product.objects.get(id=prodcutId)
    if (user.credit >= product.price * count) and (product.available_amount >= count) and (count > 0):
        product.available_amount -= count
        product.sold_amount += count
        user.credit -= product.price * count
        product.save()
        user.save()

        receipt = Receipt(
            related_user=user,
            product_name=product.name,
            sold_amount=count,
            buyer_full_name=f"{user.first_name} {user.last_name}",
            buyer_address=user.address,
            price=product.price * count,
            tracking_code=secrets.token_urlsafe(8),
            state='انجام شده'
        )
        receipt.save()

        json_result = {"success": True}
    else:
        json_result = {"success": False, "message": "عملیات ناموفق بود."}

    return JsonResponse(json_result)


def buy_view(request):
    if request.method == "POST":
        print(request.POST)
        if request.user.is_authenticated:
            return buy(request.user, int(request.POST.get('productId')), int(request.POST.get('number')))
