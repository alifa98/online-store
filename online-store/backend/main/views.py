from django.http import JsonResponse
from django.shortcuts import render
from .models import Receipt


def receipt_view(request):
    if request.method == "GET":
        receipts = Receipt.objects.all()
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
