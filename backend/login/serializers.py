'''
    Here we specify the model to work with the fields we want to be converted to JSON.
    DOCS: https://www.django-rest-framework.org/api-guide/serializers/ 

'''

from rest_framework import serializers
from .models import LoginCls


# The ModelSerializer class provides a shortcut that lets you automatically create a "Serializer class" with fields that correspond to the Model fields.
class LoginClsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCls
        fields = ('id', 'username', 'password')
        #fields = '__all__'
