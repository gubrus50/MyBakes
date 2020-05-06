# Generated by Django 3.0.4 on 2020-04-19 16:17

from django.db import migrations
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_auto_20200418_1931'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='nationality',
            field=django_countries.fields.CountryField(default='International', max_length=100, verbose_name='Wybierz narodowość przepisu'),
        ),
    ]