from django.contrib import admin
from .models import USER, HOST

class USERADMIN(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('Email', 'FirstName', 'LastName', 'Mobile', 'Password', 'DateCreated', 'DateModified')

class HOSTADMIN(admin.ModelAdmin):  # allows for a custom definition in the admin field
    list_display = ('Email', 'FirstName', 'LastName', 'Mobile', 'Password', 'DateCreated', 'DateModified')

admin.site.register(USER, USERADMIN)
admin.site.register(HOST, HOSTADMIN)
#admin.site.register(Relationship)
