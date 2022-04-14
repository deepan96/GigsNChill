''' 
 A model is the single, definitive source of information about your data. 
 It contains the essential fields and behaviors of the data you’re storing. 
 Generally, each model maps to a single database table.

 More info: https://docs.djangoproject.com/en/4.0/topics/db/models/
'''

from django.db import models
from django.utils import timezone
from datetime import datetime

# Each class represents a database table.
class USER(models.Model):
    # Each attribute of the model represents a database field.
    Email = models.CharField(max_length=50, primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Mobile = models.CharField(max_length=10, blank=True, default='')
    Password = models.CharField(max_length=50)
    DateModified = models.DateTimeField(auto_now=True)
    DateCreated = models.DateTimeField(auto_now_add=True)
    VerificationCode = models.CharField(max_length=6, default="000000")
    CodeCreationTime = models.TimeField(auto_now=True)

    def __str__(self) -> str:
        return self.Email

class HOST(models.Model):
    # Each attribute of the model represents a database field.
    Email = models.CharField(max_length=50, primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Mobile = models.CharField(max_length=10, blank=True, default='')
    Password = models.CharField(max_length=50)
    DateModified = models.DateTimeField(auto_now=True)
    DateCreated = models.DateTimeField(auto_now_add=True)
    VerificationCode = models.CharField(max_length=6, default="000000")
    CodeCreationTime = models.TimeField(auto_now=True)

    def __str__(self) -> str:
        return self.Email
