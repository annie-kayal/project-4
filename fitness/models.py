from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class Instructor(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.name}'

class Gym(models.Model):
  name = models.CharField(max_length=500)
  facilities = models.CharField(max_length=400)

  def __str__(self):
    return f'{self.name}'

class Comment(models.Model):
  text = models.CharField(max_length=2000)

  def __str__(self):
    return f'{self.text}'


class FitnessClass(models.Model):
  name = models.CharField(max_length=200)
  gym = models.ForeignKey(Gym, related_name='fitness', on_delete=models.CASCADE)
  activity_type = models.CharField(max_length=500)
  instructor = models.ForeignKey(Instructor, related_name='fitness', on_delete=models.CASCADE)
  description = models.CharField(max_length=1000)
  time_of_class = models.CharField(max_length=200)
  comment = models.ManyToManyField(Comment, related_name='fitness', blank=True)
  # user = models.ForeignKey(User, related_name='fitness', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'

class Borough(models.Model):
  name = models.CharField(max_length=200)
  image = models.CharField(max_length=1000)
  fitnessclass = models.ManyToManyField(FitnessClass, related_name='fitness', blank=True)

  def __str__(self):
    return f'{self.name}'

class BookedClass(models.Model):
  name = models.CharField(max_length=200)
  gym = models.CharField(max_length=200)
  activity_type = models.CharField(max_length=500)
  instructor = models.CharField(max_length=200)
  description = models.CharField(max_length=1000)
  time_of_class = models.CharField(max_length=200)
  # borough = models.CharField(max_length=200)
  data_booked = models.CharField(max_length=100)
  user = models.ForeignKey(User, related_name='fitness', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'


  
