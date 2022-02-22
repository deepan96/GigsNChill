''' 
 A model is the single, definitive source of information about your data. 
 It contains the essential fields and behaviors of the data you’re storing. 
 Generally, each model maps to a single database table.

 More info: https://docs.djangoproject.com/en/4.0/topics/db/models/
'''

from django.db import models

# Each class represents a database table.
class RegisterCls(models.Model):

    # Each attribute of the model represents a database field.
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    emailid = models.EmailField(max_length=254)
    mobileno = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.username
