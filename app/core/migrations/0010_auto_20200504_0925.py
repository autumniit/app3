# Generated by Django 3.0.2 on 2020-05-04 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20200504_0921'),
    ]

    operations = [
        migrations.AlterField(
            model_name='saleslog',
            name='demand',
            field=models.DecimalField(decimal_places=4, max_digits=12),
        ),
    ]
