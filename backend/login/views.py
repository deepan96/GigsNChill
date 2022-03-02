'''
    A view is a Python function that takes a web request and returns a web response.
    DOCS: https://docs.djangoproject.com/en/4.0/topics/http/views/
    DOCS: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset

'''
#TODO: Understand ViewsSets better

from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import LoginClsSerializer
from register.models import USER
from rest_framework.views import APIView

class LoginClsView(generics.CreateAPIView):
    serializer_class = LoginClsSerializer
    queryset = USER.objects.all()

'''class LoginClsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginClsSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['Email']
        update_last_login(None, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"status": status.HTTP_200_OK, "Token": token.key})'''
