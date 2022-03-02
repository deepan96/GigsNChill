from rest_framework import serializers
from .models import USER
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from datetime import date
from django.db import models
from django.utils import timezone

class RegisterSerializer(serializers.ModelSerializer):

    Password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    Password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = USER
        #fields = '__all__'
        fields = ('Email', 'FirstName', 'LastName', 'Mobile', 'Password1', 'Password2')

    def validate(self, attrs):
        if attrs['Password1'] != attrs['Password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = USER.objects.create(
            Email=validated_data['Email'],
            FirstName=validated_data['FirstName'],
            LastName=validated_data['LastName'],
            Mobile=validated_data['Mobile'],
            Password=make_password(validated_data['Password1']),
            #DateCreated = timezone.now(),
            #DateModified = timezone.now(),
            #mobile=validated_data['mobile']
        )

        
        #user.set_password(validated_data['password'])
        user.save()

        return user
