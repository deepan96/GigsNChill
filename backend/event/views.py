from django.shortcuts import render
from .models import Event, Location
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import AddNewEventSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
import sys
# Create your views here.

class AddNewEventView(APIView):
    #permission_classes = (permissions.AllowAny,)
    serializer_class = AddNewEventSerializer
    model = Event
    #def create(self, request):
    #    pass
    '''def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)'''

    def post(self, request):
        def get_queryset():
            """
            This view should return a list of all the purchases
            for the currently authenticated user.
            """
            try:
                with open("readme.txt", 'w+') as f:
                    f.write(str(request.data))
                    f.close()
                state, city = request.data['State'], request.data['City']
            except:
                Location.objects.create(State=request.data['State'], City=request.data['City'])
            return Location.objects.filter(State=state, City=city)
        serializer_class = AddNewEventSerializer(data=request.data)
        if serializer_class.is_valid():
            #try:
            LocationId = get_queryset()
            e = Event.objects.create(EventName = request.data['EventName'],
                                    EventDescription = request.data['EventDescription'],
                                    EventGenre = request.data['EventGenre'],
                                    EventType = request.data['EventType'],
                                    EventDate = request.data['EventDate'],
                                    EventStartTime = request.data['EventStartTime'],
                                    EventEndTime = request.data['EventEndTime'],
                                    Performer = request.data['Performer'],
                                    MaxNoOfSeats = request.data['MaxNoOfSeats'],
                                    SeatsAvailable = request.data['MaxNoOfSeats'],
                                    Price = request.data['Price'],
                                    HostId = request.data['HostEmail'],
                                    Address = request.data['Address'],
                                    ZipCode = request.data['ZipCode'],
                                    LocationId = LocationId,
            )


            e.save()

            return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            '''except Exception as e:
                return JsonResponse({"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e),
                                     "message": "Couldn't add the event"},
                                    status=status.HTTP_200_OK)'''
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)
