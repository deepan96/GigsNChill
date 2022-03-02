''' 
 A model is the single, definitive source of information about your data. 
 It contains the essential fields and behaviors of the data you’re storing. 
 Generally, each model maps to a single database table.

 More info: https://docs.djangoproject.com/en/4.0/topics/db/models/
'''

from django.db import models

# Each class represents a database table.
class LoginCls(models.Model):

    # Each attribute of the model represents a database field.
    Email = models.CharField(max_length=20, primary_key=True)
    Password = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.Email
