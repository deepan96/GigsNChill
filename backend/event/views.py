from django.shortcuts import render
from .models import Event, Location, Bookings
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import AddNewEventSerializer, SearchEventsSerializer, BookEventSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from register.models import HOST, USER
from datetime import date
import sys
from django.forms.models import model_to_dict

# Create your views here

class AddNewEventView(APIView):
    serializer_class = AddNewEventSerializer
    model = Event

    def post(self, request):
        def get_location_instance():
            """
            This view should return a list of all the purchases
            for the currently authenticated user.
            """
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
                                         LocationId=LocationId, )
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
    serializer_class = SearchEventsSerializer
    model = Event
    '''def get_object(self, queryset=None):
        obj = Event.objects.filter(EventDate__gte=date.today())
        return obj
    '''
    def get(self, request):
        #serializer_class = SearchEventsSerializer(many=True)
        events = []
        for event in Event.objects.filter(EventDate__gte=date.today()):
            events.append(model_to_dict(event))
        res = JsonResponse({"status": "success",
                             "data": events},
                            status=status.HTTP_200_OK)
        return res
    '''def post(self, request):
        try:
            with open("Readme.txt", "w+") as f:
                f.write(str(Event.objects.filter(EventDate__gte=date.today())))
                f.close()
        res = JsonResponse({"status": "success",
                             "data": self.get()},
                            status=status.HTTP_200_OK)
        return res
        except Exception as e:
            return JsonResponse({"status": "error", 'msg' : "unable to fetch events" + str(sys.exc_info()[2]) + str(e)}, status=status.HTTP_200_OK)
'''

class BookEventView(APIView):
    serializer_class = BookEventSerializer
    model = Bookings

    def post(self, request):
        serializer_class = BookEventSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                book = Bookings.objects.create(UserId = USER.objects.get(Email=request.data['UserId']),
                                               NoOfSeats =request.data["NoOfSeats"],
                                               EventId=Event.objects.get(EventId=request.data['EventId']))
                book.save()
                return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse(
                    {"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e),
                     "message": "Couldn't book the event"},
                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)
