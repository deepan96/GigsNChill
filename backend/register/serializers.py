from rest_framework import serializers
from .models import USER
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password, check_password
from datetime import date
from django.db import models
from django.utils import timezone

class RegisterSerializer(serializers.ModelSerializer):
    Email = serializers.CharField(required=True)
    FirstName = serializers.CharField(required=True)
    LastName = serializers.CharField(required=True)
    Mobile = serializers.CharField(required=True)
    Password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    Password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = USER
        #fields = '__all__'
        fields = ('Email', 'FirstName', 'LastName', 'Mobile', 'Password1', 'Password2')

class PasswordRecoverySerializer(serializers.Serializer):

    """
    Serializer for password reset endpoint.
    """
    Email = serializers.CharField(required=True)
    Password1 = serializers.CharField(required=True)
    Password2 = serializers.CharField(required=True)
    class Meta:
        model = USER
        #fields = '__all__'
        fields = ('Email', 'Password1', 'Password2')
    '''def reteieve(self, data):
        username = data.get('Email')
        return USER.objects.get(Email__exact=username)'''
    '''def validate(self, attrs):
        if attrs['Password1'] != attrs['Password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def update(self, validated_data):
        #user = USER.objects.update(Password=make_password(validated_data['Password1']))
        user = USER.object.set_password(serializer.data.get(validated_data['Password1']))
        #user = USER.objects.update(Password=validated_data['Password1'])
        user.save()

        return user'''

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
