from django.db import models
from django.utils import timezone
from backend.user.models import User


class Category(models.Model):
    name = models.CharField(max_length=150, null=False, default="دسته بندی نشده", unique=True)

    def __str__(self):
        return f"{self.name}"


def default_category():
    return Category.objects.get(name='دسته بندی نشده').pk


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, default=default_category())
    price = models.FloatField(default=0)
    available_amount = models.IntegerField(default=0)
    sold_amount = models.IntegerField(default=0)
    image = models.ImageField(default='product.png', upload_to="uploaded_product/", blank=True)

    def __str__(self):
        return f"{self.name}"


receipt_state = [
  ('در حال انجام', 'در حال انجام'),
  ('انجام شده', 'انجام شده'),
  ('لفو شده', 'لغو شده'),
]


class Receipt(models.Model):
    related_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    product_name = models.CharField(max_length=200)
    sold_amount = models.IntegerField(default=0)
    buyer_full_name = models.CharField(max_length=300)
    buyer_address = models.CharField(max_length=1000)
    price = models.IntegerField(default=0)
    tracking_code = models.CharField(max_length=20, null=True, blank=False)
    purchase_date = models.DateTimeField(default=timezone.now)
    state = models.CharField(max_length=100, choices=receipt_state, default='در حال انجام')

    def __str__(self):
        return f"{self.product_name}: {self.buyer_full_name}"
