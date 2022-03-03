"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from login import views
from rest_framework import routers
from register import views as view_register

# Maps LoginCls ViewSet to ~/api/login
"""router = routers.DefaultRouter()
router.register(r'login', views.LoginClsView, 'login')
router.register(r'register', view_register.RegisterView.as_view(), 'register')"""


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.LoginClsView.as_view(), name='login'), # put router urls at ~/api
    path('register/', view_register.RegisterView.as_view(), name="register"),
    path('recoverpassword/', view_register.RecoverPasswordView.as_view(), name="recoverpassword"),
    path('updatepassword/', view_register.UpdatePasswordView.as_view(), name="updatepassword"),
]
