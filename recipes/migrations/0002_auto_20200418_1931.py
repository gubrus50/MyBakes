# Generated by Django 3.0.4 on 2020-04-18 18:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='author',
            new_name='publisher',
        ),
    ]