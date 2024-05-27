from django.db import models

# Create your models here.
class Events(models.Model):

    name = models.CharField("txnomeevento", max_length=128, null=False)
    description = models.CharField("txdescricaoevento", max_length=512, null=True)
    initial_date = models.DateField("dtinicialevento", null=False)
    final_date = models.DateField("dtfinalevento", null=False)
    initial_hour = models.TimeField("hrinicialevento", null=False)
    final_hour = models.TimeField("hrfinalevento", null=False)
    min_participants = models.IntegerField("numinimoparticipante", null=True)
    max_participants = models.IntegerField("numaximoparticipante", null=True)
    num_participants= models.IntegerField("nuparticipantes", null=True)
    enrollment_value = models.DecimalField("vlinscricaoevento", max_digits=10, decimal_places=2, null=False)
    location = models.TextField("txlocalevento", null=False)

    class Meta:
        managed = True
        db_table = 'events'