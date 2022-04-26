import traceback

from django.shortcuts import render

from .models import Event, Location, Bookings, Bookmarks, EventReviews
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import AddNewEventSerializer, SearchEventsSerializer, \
    BookEventSerializer, BookmarksSerializer, InviteFriendsSerializer, \
    CancelEventSerializer, EventReviewsSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from register.models import HOST, USER
from datetime import date
import sys
from django.forms.models import model_to_dict
# Mail
from django.conf import settings
from django.core.mail import send_mail


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

            if not Location.objects.filter(State=request.data['State'], City=request.data['City']).exists():
                l = Location.objects.create(State=request.data['State'], City=request.data['City'])
                l.save()
            return

        serializer_class = AddNewEventSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                get_location_instance()
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
                                         LocationId=Location.objects.get(State=request.data['State'],
                                                                         City=request.data['City']),
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
        events = [model_to_dict(e) for e in Event.objects.filter(EventDate__gte=date.today(), EventStatus='active')]
        for event in events:
            location = model_to_dict(Location.objects.get(LocationId=event['LocationId']))
            event.update(location)
            rating = []
            for review in EventReviews.objects.filter(EventId=event['EventId']):
                rating.append(int(review.Rating))
            if rating:
                event.update({"Rating":sum(rating)/len(rating)})
            else:
                event.update({"Rating":0})
        return JsonResponse({"status": "success", "data": events},
                            status=status.HTTP_200_OK)


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
                event_object = Event.objects.get(EventId=request.data['EventId'])
                user_info = USER.objects.get(Email=request.data['UserId'])
                SeatsAvailable = int(event_object.SeatsAvailable) - int(request.data["NoOfSeats"])
                if event_object.SeatsAvailable == 0:
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
                event_object.SeatsAvailable = SeatsAvailable
                event_object.save()
                new_booking.save()
                subject = f'GigsNChill Booking confirmation to Event {event_object.EventName}'
                message = f'Hi {user_info.FirstName}, \nYour booking to the event {event_object.EventName} is ' \
                          f'confirmed\nEvent Details:\nEventName: {event_object.EventName} \n' \
                          f'Event Date: {event_object.EventDate} \n' \
                          f'No. of seats: {new_booking.NoOfSeats}\n' \
                          f'Amount: {int(new_booking.NoOfSeats)*int(event_object.Price)}' \
                          f'\n\nThanks,\nGigsnChill Team'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [request.data['UserId']]
                send_mail(subject, message, email_from, recipient_list)
                return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            except Exception as e:
                traceback.print_exc()
                return JsonResponse(
                    {"status": "error", "data": str(serializer_class.errors) + str(sys.exc_info()[2]) + str(e),
                     "message": "Couldn't book the event"},
                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)


class CancelBookingView(APIView):
    """
    This view should be able to cancel the specified Booking when requested by User.
    """
    model = [Event, Bookings]
    def get(self, request, BookingId=None):
        try:
            booking_info = Bookings.objects.get(BookingId=BookingId)
            if booking_info.BookingStatus == "active":
                event_info = Event.objects.get(EventId=booking_info.EventId.EventId)
                event_info.SeatsAvailable += booking_info.NoOfSeats
                booking_info.BookingStatus = 'cancelled'
                booking_info.save()
                event_info.save()
                user_info = USER.objects.get(Email=booking_info.UserId)
                subject=f'Booking Cancellation for event {event_info.EventName}'
                message=f'Hi {user_info.FirstName}, \nYour booking to the event {event_info.EventName} is ' \
                          f'has been cancelled.\nEvent Details:\nEventName: {event_info.EventName} \n' \
                          f'Event Date: {event_info.EventDate} \n' \
                          f'No. of seats: {booking_info.NoOfSeats}\n' \
                          f'Amount: {int(booking_info.NoOfSeats)*int(event_info.Price)}' \
                          f'\n\nThanks,\nGigsnChill Team'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [user_info.Email]
                send_mail(subject, message, email_from, recipient_list)
            return JsonResponse({"status": "success", "message": "Booking Cancelled"}, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"status": "error", "message": "Couldn't cancel the Booking"},
                                status=status.HTTP_200_OK)


class CancelEventView(APIView):
    model = [Event, Bookings]
    serializer_class = CancelEventSerializer
    def get(self,request, EventId=None):
        try:
            event_info = Event.objects.get(EventId=EventId)
            attendees = []
            if event_info.EventStatus == "active":
                for booking in Bookings.objects.filter(EventId=event_info.EventId):
                    attendees.append(booking.UserId.Email)
                    booking.BookingStatus = 'cancelled'
                    booking.save()
            subject=f'Event Cancellation {event_info.EventName}'
            message=f'Hello, \nYour booking to the event {event_info.EventName} is ' \
                    f'has been cancelled.\nEvent Details:\nEventName: {event_info.EventName} \n' \
                    f'Event Date: {event_info.EventDate}' \
                    f'\n\nThanks,\nGigsnChill Team'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = attendees
            send_mail(subject, message, email_from, recipient_list)
            event_info.EventStatus = "cancelled"
            event_info.save()
            return JsonResponse({"status": "success", "message": "Event Cancelled"}, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"status": "error", "message": "Couldn't cancel the Event"},
                                status=status.HTTP_200_OK)


class RetrieveBookingInfoView(APIView):
    def get(self, request, BookingId=None):
        try:
            booking_info = Bookings.objects.get(BookingId=BookingId)
            info = model_to_dict(booking_info)
            info.update(model_to_dict(booking_info.EventId))
            rating = []
            for review in EventReviews.objects.filter(EventId=info['EventId']):
                rating.append(int(review.Rating))
            if rating:
                info.update({"Rating":sum(rating)/len(rating)})
            else:
                info.update({"Rating":0})
            return JsonResponse({"status": "success", "data": info}, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"status": "error", "message": "Couldn't retrieve booking details"},
                                status=status.HTTP_200_OK)


class RetrieveBookmarkView(APIView):
    """
    This view should retrieve the bookmarked events from the Bookmarks Database
    when a registered user requests the bookmarks.
    """

    serializer_class = BookmarksSerializer
    model = Bookmarks

    def get(self, request, Email=None):
        try:
            bookmarks = [model_to_dict(book) for book in Bookmarks.objects.filter(UserId=Email,
                                                                                  BookmarkStatus=True)]
            for bookmark in bookmarks:
                bookmarked_event = model_to_dict(Event.objects.get(EventId=bookmark['EventId']))
                bookmark.update(bookmarked_event)
            return Response({"status": "success", 'data': bookmarks},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status": "error", "data": []},
                            status=status.HTTP_200_OK)


class BookmarkEventView(APIView):
    """
    This view should add the bookmarked events to the Bookmarks Database
    when a registered user bookmarks an event. If the event is already
    bookmarked by the respective user, the bookmark status should get updated
    """
    serializer_class = BookmarksSerializer
    model = Bookmarks

    def post(self, request):
        serializer_class = BookmarksSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                # Get the bookmark status from request and assign the respective boolean value
                if 'BookmarkStatus' in request.data and request.data['BookmarkStatus'].lower() == "true":
                    bookmark_status = True
                else:
                    bookmark_status = False

                try:
                    # verify whether the event is already bookmarked if yes, update the status.
                    self.previous_bookmark = Bookmarks.objects.get(UserId=request.data['UserId'],
                                                                   EventId=request.data['EventId'])
                    self.previous_bookmark.BookmarkStatus = bookmark_status
                    self.previous_bookmark.save()
                    return JsonResponse({"status": "success", "data": serializer_class.data,
                                         'message': 'Bookmark updated successfully'},
                                        status=status.HTTP_200_OK)
                except:
                    # If there is no bookmark for the particular event, create new bookmark and save it to the database
                    new_bookmark = Bookmarks.objects.create(UserId=USER.objects.get(Email=request.data['UserId']),
                                                            EventId=Event.objects.get(EventId=request.data['EventId']),
                                                            BookmarkStatus=bookmark_status, )
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


class InviteFriendsView(APIView):
    """
    This view should verify the user is already registered or not.
    """
    serializer_class = InviteFriendsSerializer
    model = Event

    def post(self, request):
        '''if Type.lower() == 'User'.lower():
            db_table = USER
        else:
            db_table = HOST'''
        try:
            # self.object = db_table.objects.get(Email=Email)
            self.event = Event.objects.get(EventId=request.data['EventId'])
            subject = 'GigsNChill Event Invite'
            message = f"Hi {request.data['RecipientEmail']}, You have been invited by " + request.data['Email'] + \
                      "to attend the following event hosted bt Gigs N\' " \
                      f"Chill. Event ID: " + str(request.data['EventId']) + "Event Name: " + self.event.EventName
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [request.data['RecipientEmail']]
            send_mail(subject, message, email_from, recipient_list)
            return JsonResponse({'status': 'Success',
                                 'data': 'Chat',
                                 "message": "Mail sent successfully"},
                                status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'status': 'Error',
                                 'data': 'Email',
                                 "message": str(sys.exc_info()[2]) + str(e), },
                                status=status.HTTP_400_BAD_REQUEST)


class RetrieveEventParticipantsView(APIView):
    def get(self, request, EventId):
        try:
            participants = []
            for booking in Bookings.objects.filter(EventId=EventId, BookingStatus="active"):
                participants.append(booking.UserId.Email)
            return JsonResponse({"status": "success", "data": list(set(participants))}, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"status": "error", "message": "Couldn't retrieve the participants"},
                                status=status.HTTP_200_OK)


class EventReviewView(APIView):
    serializer_class = EventReviewsSerializer
    model = EventReviews

    def post(self, request):
        serializer_class = EventReviewsSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                rating_info = EventReviews.objects.get(Email=request.data['Email'], EventId=request.data['EventId'])
                rating_info.Rating=request.data['Rating']
                rating_info.save()
            except:
                rating_info = EventReviews.objects.create(Email=USER.objects.get(Email=request.data['Email']),
                                                          EventId=Event.objects.get(EventId=request.data['EventId']),
                                                          Rating=request.data['Rating'])
                rating_info.save()
            return JsonResponse({'status': 'Success', "message": "Review added successfully"},
                                status=status.HTTP_200_OK)


        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)



