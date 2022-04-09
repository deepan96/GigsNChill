'''
    Here we specify the model to work with the fields we want to be converted to JSON.
    DOCS: https://www.django-rest-framework.org/api-guide/serializers/ 

'''

from rest_framework import serializers
from register.models import USER, HOST
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password,check_password

class LoginClsSerializer(serializers.Serializer):
    Email = serializers.CharField(required=True)
    Password = serializers.CharField(required=True)
    Type = serializers.CharField(required=True)
    class Meta:
        model = USER
        #fields = ('Email', 'Password')

'''
    def validate(self, data):
        username = data.get('Email')
        password = data.get('Password')
        if data.get('Type') == 'User':
            db_table = USER
        else:
            db_table = HOST
        try:
            user = USER.objects.get(Email__exact=username)
        except:
            msg = "Account does not exist"
            raise serializers.ValidationError(msg, code='authorization')
        if username and password:
            if not check_password(password, user.Password):
                msg = ('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = ('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        data['Email'] = user
        return data
    def create(self, data):
        if data.get('Type') == 'User':
            db_table = USER
        else:
            db_table = HOST
        username = data.get('Email')
        return db_table.objects.get(Email__exact=username)
# The ModelSerializer class provides a shortcut that lets you automatically create a "Serializer class" with fields that correspond to the Model fields.

        #fields = '__all__'
'''
