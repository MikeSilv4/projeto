from django.db import models
from autentication.models import CustomUser
from event.models import Events
# Create your models here.

class UserEvents(models.Model):

    user = models.ForeignKey(CustomUser, null=False, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, null=False, on_delete=models.CASCADE)
    class Meta:
        managed = True
        db_table = 'user_events'