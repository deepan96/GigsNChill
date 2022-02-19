# Docs: https://docs.djangoproject.com/en/4.0/ref/contrib/admin/

from django.contrib import admin
from .models import LoginCls

class LoginClsAdmin(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('username', 'password') 
    
admin.site.register(LoginCls, LoginClsAdmin)  # Link LoginCls model with above rules, and register to admin page
