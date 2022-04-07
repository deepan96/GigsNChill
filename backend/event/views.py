from django.shortcuts import render
from .models import Event, Location, Bookings, Bookmarks
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import AddNewEventSerializer, SearchEventsSerializer, \
    BookEventSerializer, BookmarksSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from register.models import HOST, USER
from datetime import date
import sys
from django.forms.models import model_to_dict


# Create your views here
class AddNewEventView(APIView):
    """
    This view should add the new events to the Events Database
    when a registered host adds a new event.
    """
    serializer_class = AddNewEventSerializer
    model = Event

    def post(self, request):
        def get_location_instance():
            """"Verify if the location details already present in location database.
            If it is not present, add the details to the location database"""
            try:
                return Location.objects.get(State=request.data['State'], City=request.data['City'])
            except:
                Location.objects.create(State=request.data['State'], City=request.data['City'])
                return Location.objects.get(State=request.data['State'], City=request.data['City'])

        serializer_class = AddNewEventSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                LocationId = get_location_instance()
                e = Event.objects.create(EventName=request.data['EventName'],
                                         EventDescription=request.data['EventDescription'],
                                         EventGenre=request.data['EventGenre'],
                                         EventType=request.data['EventType'],
                                         EventDate=request.data['EventDate'],
                                         EventStartTime=request.data['EventStartTime'],
                                         EventEndTime=request.data['EventEndTime'],
                                         Performer=request.data['Performer'],
                                         MaxNoOfSeats=request.data['MaxNoOfSeats'],
                                         SeatsAvailable=request.data['MaxNoOfSeats'],
                                         Price=request.data['Price'],
                                         HostId=HOST.objects.get(Email=request.data['HostEmail']),
                                         Address=request.data['Address'],
                                         ZipCode=request.data['ZipCode'],
                                         LocationId=LocationId,
                                         ImageUrl=request.data['ImageUrl'], )
                e.save()
                return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse(
                    {"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e),
                     "message": "Couldn't add the event"},
                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)


class SearchEvents(APIView):
    """
    This view should return only the future events to the search page,
    which should be available to the user for booking the event.
    And past events should be filtered out and should not be displayed to the user.
    """
    serializer_class = SearchEventsSerializer
    model = Event

    def get(self, request):
        # serializer_class = SearchEventsSerializer(many=True)
        events = []
        for event in Event.objects.filter(EventDate__gte=date.today()):
            events.append(model_to_dict(event))
        res = JsonResponse({"status": "success",
                            "data": events},
                           status=status.HTTP_200_OK)
        return res


class BookEventView(APIView):
    """
    This view should add the new bookings to the Bookings Database
    when a registered user books a specified number of seats
    for a particular event.
    """
    serializer_class = BookEventSerializer
    model = Bookings

    def post(self, request):

        serializer_class = BookEventSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                self.event_object = Event.objects.get(EventId=request.data['EventId'])
                SeatsAvailable = int(self.event_object.SeatsAvailable) - int(request.data["NoOfSeats"])
                if self.event_object.SeatsAvailable == 0:
                    return JsonResponse(
                        {"status": "error",
                         "message": "Couldn't book the event as seats are full for the requested Event"},
                        status=status.HTTP_200_OK)
                if SeatsAvailable < 0:
                    return JsonResponse(
                        {"status": "error",
                         "message": "Couldn't book the event because the requested number"
                                    " of seats not available or Seats are full"},
                        status=status.HTTP_200_OK)

                new_booking = Bookings.objects.create(UserId=USER.objects.get(Email=request.data['UserId']),
                                                      NoOfSeats=request.data["NoOfSeats"],
                                                      EventId=Event.objects.get(EventId=request.data['EventId']))
                self.event_object.SeatsAvailable = SeatsAvailable
                self.event_object.save()
                new_booking.save()
                return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse(
                    {"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e),
                     "message": "Couldn't book the event"},
                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)


class BookmarkEventView(APIView):
    """
    This view should add the bookmarked events to the Bookmarks Database
    when a registered user bookmarks a event a event. If the event is already
    bookmarked by the respective user, the bookmark status should get updated
    """
    serializer_class = BookmarksSerializer
    model = Bookmarks

    def __init__(self, **kwargs):
        super().__init__(kwargs)
        self.previous_bookmark = None

    def post(self, request):
        f = open("readme.txt", "w+")
        f.write(str(request.data))
        f.close()
        serializer_class = BookmarksSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                # Get the bookmark status from request and assign the respective boolean value
                if 'BookmarkStatus' in request.data and request.data['BookmarkStatus'].lower() == "true":
                    bookamrk_status = True
                else:
                    bookamrk_status = False

                try:
                    # verify whether the event is already bookmarked if yes, update the status.
                    self.previous_bookmark = Bookmarks.objects.get(UserId=request.data['UserId'],
                                                                   EventId=request.data['EventId'])
                    self.previous_bookmark.BookmarkStatus = bookamrk_status
                    self.previous_bookmark.save()
                    return JsonResponse({"status": "success", "data": serializer_class.data,
                                         'message': 'Bookmark updated successfully'},
                                        status=status.HTTP_200_OK)
                except:
                    # If there is no bookmark for the particular event, create new bookmark and save it to the database
                    new_bookmark = Bookmarks.objects.create(UserId=USER.objects.get(Email=request.data['UserId']),
                                                            EventId=Event.objects.get(EventId=request.data['EventId']),
                                                            BookmarkStatus=bookamrk_status, )
                    new_bookmark.save()
                    return JsonResponse({"status": "success", "data": serializer_class.data,
                                         'message': 'Bookmark added successfully'},
                                        status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse(
                    {"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e), },
                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)
