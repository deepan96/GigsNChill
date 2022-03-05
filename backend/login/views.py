'''
    A view is a Python function that takes a web request and returns a web response.
    DOCS: https://docs.djangoproject.com/en/4.0/topics/http/views/
    DOCS: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset

'''
#TODO: Understand ViewsSets better

from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, status
from .serializers import LoginClsSerializer
from register.models import USER, HOST
from rest_framework.views import APIView
from django.http import JsonResponse
import sys
from django.contrib.auth.hashers import check_password

'''class LoginClsView(generics.CreateAPIView):
    serializer_class = LoginClsSerializer
    queryset = USER.objects.all()'''

class LoginClsView(APIView):
    serializer_class = LoginClsSerializer
    def post(self, request):
        serializer_class = LoginClsSerializer(data=request.data)
        try:
            if serializer_class.is_valid():
                if request.data['Type'] == 'User':
                    db_table = USER
                else:
                    db_table = HOST
                try:
                    self.object = db_table.objects.get(Email=request.data['Email'])
                except:
                    return JsonResponse({'status': 'error',
                                         "message": "User account associated with the Email doesnot exist"},
                                        status=status.HTTP_400_BAD_REQUEST)
                if not check_password(request.data['Password'], self.object.Password):
                    return JsonResponse({'status': 'error',
                                         "message": "Incorrect password"},
                                        status=status.HTTP_400_BAD_REQUEST)
                else:
                    return JsonResponse({'status': 'Success',
                                        "message": "Logged In Successfully"},
                                        status=status.HTTP_200_OK)
            else:
                return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)
        except:
            return JsonResponse({"status": "error", "data": sys.exc_info()[2]}, status=status.HTTP_200_OK)

'''class LoginClsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginClsSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['Email']
        update_last_login(None, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"status": status.HTTP_200_OK, "Token": token.key})'''
