# Generated by Django 3.0.5 on 2020-04-22 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_auto_20200422_0933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='https://static.thenounproject.com/png/629576-200.png', upload_to='profile_image'),
        ),
    ]