# Generated by Django 3.1.1 on 2021-07-18 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipt',
            name='tracking_code',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='product.png', upload_to='uploaded_product/'),
        ),
    ]
