'''
    Here we specify the model to work with the fields we want to be converted to JSON.
    DOCS: https://www.django-rest-framework.org/api-guide/serializers/

'''

from rest_framework import serializers
from register.models import HOST, USER
from .models import Event, Bookings, Bookmarks, Location


class AddNewEventSerializer(serializers.Serializer):
    """
    Serializer for adding new event.
    """
    EventName = serializers.CharField(required=True)
    EventDescription = serializers.CharField(required=True)
    EventGenre = serializers.CharField(required=True)
    EventType = serializers.CharField(required=True)
    EventDate = serializers.DateField(required=True)
    EventStartTime = serializers.TimeField(required=True)
    EventEndTime = serializers.TimeField(required=True)
    Performer = serializers.CharField(required=True)
    MaxNoOfSeats = serializers.IntegerField(required=True)
    Price = serializers.IntegerField(required=True)
    HostEmail = serializers.CharField(required=True)
    Address = serializers.CharField(required=True)
    City = serializers.CharField(required=True)
    State = serializers.CharField(required=True)
    ZipCode = serializers.CharField(required=True)
    ImageUrl = serializers.URLField(max_length=500, min_length=0, allow_blank=True)

    class Meta:
        model = Event


class SearchEventsSerializer(serializers.Serializer):
    """
    Serializer for searching future events.
    """

    class Meta:
        model = [Event, Location]


class BookEventSerializer(serializers.Serializer):
    """
    Serializer for booking available events.
    """
    UserId = serializers.CharField(required=True)
    NoOfSeats = serializers.IntegerField(required=True)
    EventId = serializers.CharField(required=True)

    class Meta:
        model = Bookings


class BookmarksSerializer(serializers.Serializer):
    """
    Serializer for bookmarking the favourite events.
    """
    UserId = serializers.CharField(required=True)
    EventId = serializers.CharField(required=True)
    BookmarkStatus = serializers.BooleanField(required=True)

    class Meta:
        model = Bookmarks


class InviteFriendsSerializer(serializers.Serializer):
    """
    Serializer for Inviting friends for the favourite events.
    """
    Email = serializers.CharField(required=True)
    EventId = serializers.CharField(required=True)
    RecipientEmail = serializers.CharField(required=True)

    class Meta:
        model = Event
        fields = ('Email', 'EventId', 'RecipientEmail')
