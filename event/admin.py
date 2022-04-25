from django.contrib import admin
from .models import Event, Location, Bookings, EventReviews


# Register your models here.
class EventAdmin(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('EventId', 'EventName', 'EventGenre', 'EventType', 'EventDate', 'EventStartTime',
                    'EventEndTime', 'Performer', 'MaxNoOfSeats', 'SeatsAvailable',
                    'Price', 'HostId', 'LocationId', 'ImageUrl', 'EventStatus')


class LocationAdmin(admin.ModelAdmin):
    list_display = ('LocationId', 'City', 'State',)


class BookingAdmin(admin.ModelAdmin):
    list_display = ('BookingId', 'UserId', 'NoOfSeats', 'EventId', 'BookingStatus')


class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("BookmarkId", "UserId", "EventId", "BookmarkStatus")


class EventReviewsAdmin(admin.ModelAdmin):
    list_display = ('ReviewId', 'Email', 'EventId', 'Rating')


admin.site.register(Event, EventAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Bookings, BookingAdmin)
admin.site.register(EventReviews, EventReviewsAdmin)
