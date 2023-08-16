from django.db import models

# Create your models here.
class Entry(models.Model):
   name = models.CharField(max_length=150)
   email= models.EmailField(max_length=50)
   image = models.ImageField(upload_to= 'entryImg')


