# Generated by Django 5.0.6 on 2024-06-17 00:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_remove_events_min_participants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='num_participants',
            field=models.IntegerField(default=0, null=True, verbose_name='nuparticipantes'),
        ),
    ]