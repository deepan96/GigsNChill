from .models import USER
from .serializers import RegisterSerializer
from rest_framework import generics, permissions


class RegisterView(generics.CreateAPIView):
    queryset = USER.objects.all()
    #permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    #def create(self, request):
    #    pass


