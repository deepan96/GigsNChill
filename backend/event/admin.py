from django.contrib import admin
from .models import Event, Location
# Register your models here.
class EventAdmin(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('EventId', 'EventName', 'EventGenre', 'EventType', 'EventDate', 'EventStartTime',
                    'EventEndTime', 'Performer', 'MaxNoOfSeats', 'SeatsAvailable',
                    'Price', 'HostId', 'LocationId')

class LocationAdmin(admin.ModelAdmin):
    list_display = ('LocationId', 'City', 'State',)

admin.site.register(Event, EventAdmin)
admin.site.register(Location, LocationAdmin)
