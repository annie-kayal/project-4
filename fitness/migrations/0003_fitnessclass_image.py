# Generated by Django 2.2.12 on 2020-09-15 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness', '0002_bookedclass_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='fitnessclass',
            name='image',
            field=models.CharField(default='https://o2fitnessclubs.com/wp-content/uploads/2018/10/1X1A2714.jpg', max_length=1000),
            preserve_default=False,
        ),
    ]