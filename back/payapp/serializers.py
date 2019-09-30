from rest_framework import serializers
from .models import Client
from django.contrib.auth.models import User


class ClientDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = '__all__'

class ClientListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = '__all__'

