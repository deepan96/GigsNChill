'''
    Here we specify the model to work with the fields we want to be converted to JSON.
    DOCS: https://www.django-rest-framework.org/api-guide/serializers/ 

'''

from rest_framework import serializers
from register.models import USER

from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from django.contrib.auth.hashers import make_password,check_password

class LoginClsSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('Email', 'Password')
    Email = serializers.CharField(max_length=255)
    Password = serializers.CharField(
        label=("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        max_length=128,
        write_only=True
    )

    def validate(self, data):
        username = data.get('Email')
        password = data.get('Password')
        try:
            user = USER.objects.get(Email__exact=username)
        except:
            msg = "Account does not exist"
            raise serializers.ValidationError(msg, code='authorization')
        if username and password:
            if not check_password(password, user.Password):
                msg = ('Unable to log in with provided credentials.'+ str(user.Password) + str(password))
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = ('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        data['Email'] = user
        return data
# The ModelSerializer class provides a shortcut that lets you automatically create a "Serializer class" with fields that correspond to the Model fields.

        #fields = '__all__'
