# Generated by Django 4.0.2 on 2022-04-07 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0003_host'),
        ('event', '0009_event_imageurl'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookmarks',
            fields=[
                ('BookmarkId', models.AutoField(primary_key=True, serialize=False)),
                ('BookmarkStatus', models.BooleanField(default=True)),
                ('EventId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='event.event')),
                ('UserId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='register.user')),
            ],
        ),
    ]
