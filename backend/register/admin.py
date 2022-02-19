from django.contrib import admin
from .models import RegisterCls

class RegisterClsAdmin(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('username', 'password', 'emailid', 'mobileno') 
    
admin.site.register(RegisterCls, RegisterClsAdmin)
#admin.site.register(Relationship)
