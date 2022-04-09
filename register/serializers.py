from rest_framework import serializers
from .models import USER, HOST
from event.models import Event
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password, check_password
from datetime import date
from django.db import models
from django.utils import timezone

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for User Registration.
    """
    Email = serializers.CharField(required=True)
    FirstName = serializers.CharField(required=True)
    LastName = serializers.CharField(required=True)
    Mobile = serializers.CharField(required=False)
    Password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    Password2 = serializers.CharField(write_only=True, required=True)
    Type = serializers.CharField(required=True)
    class Meta:
        model = USER
        #fields = '__all__'
        fields = ('Email', 'FirstName', 'LastName', 'Mobile', 'Password1', 'Password2', 'Type')


class PasswordRecoverySerializer(serializers.Serializer):
    """ Serializer for password reset endpoint """
    Email = serializers.CharField(required=True)
    class Meta:
        model = USER
        fields = ('Email')

class ResetPasswordSerializer(serializers.Serializer):
    """ Serializer for reset password change endpoint """
    Email = serializers.CharField(required=True)
    Password = serializers.CharField(required=True)
    class Meta:
        model = USER
        fields = ('Email', 'Password')

class UpdatePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    Email = serializers.CharField(required=True)
    OldPassword = serializers.CharField(required=True)
    Password1 = serializers.CharField(required=True)
    Password2 = serializers.CharField(required=True)
    class Meta:
        model = USER
        #fields = '__all__'
        fields = ('Email', 'OldPassword', 'Password1', 'Password2')

class ProfileSerializer(serializers.Serializer):
    """
    Serializer for profile view endpoint.
    """
    Email = serializers.CharField(required=True)
    Type = serializers.CharField(required=False)
    class Meta:
        model = [USER, HOST, Event]
        fields = ('Email', 'Type',)

