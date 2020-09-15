from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Comment, FitnessClass, Borough, Gym, Instructor, BookedClass

class InstructorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instructor
    fields = ('id', 'name')



class GymSerializer(serializers.ModelSerializer):
  class Meta:
    model = Gym
    # borough is a foregin key - one per gym
    fields = ('id', 'name', 'facilities')

class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment
    fields = ('id', 'text')

class BoroughSerializer(serializers.ModelSerializer):
  class Meta:
    model = Borough
    fields = ('id', 'name', 'image', 'fitnessclass')


class FitnessClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'instructor', 'time_of_class', 'description', 'comment')

class PopulateFitnessClassSerializer(serializers.ModelSerializer):
  instructor = InstructorSerializer()
  gym = GymSerializer()
  comment = CommentSerializer(many=True)

  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'instructor', 'time_of_class', 'description', 'comment')

class PopulateBoroughSerializer(serializers.ModelSerializer):
  fitnessclass = PopulateFitnessClassSerializer(many=True, required=False)
  class Meta:
    model = Borough
    fields = ('id', 'name', 'image', 'fitnessclass')

class BookedClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = BookedClass
    fields = ('id', 'name', 'gym', 'activity_type', 'instructor', 'time_of_class', 'description', 'user', 'data_booked')




