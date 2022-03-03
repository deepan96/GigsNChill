from .models import USER
from .serializers import RegisterSerializer, PasswordRecoverySerializer, UpdatePasswordSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
import json, sys
from django.contrib.auth.decorators import login_required

class RegisterView(APIView):
    #permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    model = USER
    #def create(self, request):
    #    pass
    '''def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)'''

    def post(self, request):

        serializer_class = RegisterSerializer(data=request.data)
        if serializer_class.is_valid():
            if request.data['Password1'] != request.data['Password2']:
                return JsonResponse({"status": "error", "message": "Password fields didn't match.",
                                     "data": serializer_class.errors}, status=status.HTTP_200_OK)
            try:
                user = USER.objects.create(
                    Email=request.data['Email'],
                    FirstName=request.data['FirstName'],
                    LastName=request.data['LastName'],
                    Mobile=request.data['Mobile'],
                    Password=make_password(request.data['Password1']),
                    #DateCreated = timezone.now(),
                    #DateModified = timezone.now(),
                    #mobile=validated_data['mobile']
                )

                user.save()

                return JsonResponse({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
            except:
                return JsonResponse({"status": "error", "data": serializer_class.errors,
                                     "message": "User account associated with the provided Email already exists"},
                                    status=status.HTTP_200_OK)
        else:
            return JsonResponse({"status": "error", "data": serializer_class.errors}, status=status.HTTP_200_OK)

#class ProfileView():

class RecoverPasswordView(APIView):

    #permission_classes = (permissions.AllowAny,)
    """
    An endpoint for changing password.
    """
    model = USER
    queryset = USER.objects.all()
    serializer_class = PasswordRecoverySerializer

    '''def get_object(self, request, **kwargs):
        with open("readme.txt", "w") as f:
            f.write(str(request.data))
            f.close()
        accounts = USER.objects.get(Email=request.data['Email'])
        return accounts'''
    def put(self, request):
        #self.lookup_field = 'pk'
        serializer_class = PasswordRecoverySerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                self.object = USER.objects.get(Email=request.data['Email'])
            except:
                return Response({'status': 'error',
                                     "message": "User account associated with the Email doesnot exist"},
                                status=status.HTTP_400_BAD_REQUEST)
            if request.data['Password1'] != request.data['Password2']:
                return Response({'status': 'error',
                                 "message": "Password fields didn't match."},
                                status=status.HTTP_400_BAD_REQUEST)
            # make_password also hashes the password that the user will get
            self.object.Password = make_password(request.data['Password1'])
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password resetted successfully',
                'data': []
            }
            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePasswordView(APIView):
    """
    An endpoint for changing password.
    """
    model = USER
    queryset = USER.objects.all()
    serializer_class = UpdatePasswordSerializer
    def put(self, request):
        #self.lookup_field = 'pk'
        serializer_class = UpdatePasswordSerializer(data=request.data)
        if serializer_class.is_valid():
            try:
                self.object = USER.objects.get(Email=request.data['Email'])
            except:
                return Response({'status': 'error',
                                 "message": "User account associated with the Email doesnot exist"},
                                status=status.HTTP_400_BAD_REQUEST)
            if not check_password(request.data['OldPassword'], self.object.Password):
                return Response({'status': 'error', "message": "Incorrect old password"},
                                status=status.HTTP_400_BAD_REQUEST)
            if request.data['Password1'] != request.data['Password2']:
                return Response({'status': 'error',
                                 "message": "Password fields didn't match."},
                                status=status.HTTP_400_BAD_REQUEST)
            # make_password also hashes the password that the user will get
            self.object.Password = make_password(request.data['Password1'])
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password resetted successfully',
                'data': []
            }
            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

