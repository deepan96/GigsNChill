'''
    A view is a Python function that takes a web request and returns a web response.
    DOCS: https://docs.djangoproject.com/en/4.0/topics/http/views/
    DOCS: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset

'''
#TODO: Understand ViewsSets better

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LoginClsSerializer
from .models import LoginCls

class LoginClsView(viewsets.ModelViewSet):
    serializer_class = LoginClsSerializer
    queryset = LoginCls.objects.all()
