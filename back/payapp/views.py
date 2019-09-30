from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from .models import Client
from django.contrib.auth.models import User
from .serializers import ClientDetailSerializer, ClientListSerializer
from rest_framework.response import Response

# Create your views here.



class ClientListView(generics.ListAPIView):
	serializer_class = ClientListSerializer
	queryset = Client.objects.all()

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class=ClientDetailSerializer
	lookup_field = 'inn'

	def get_queryset(self):
		inn = self.kwargs['inn']
		return Client.objects.filter(inn=inn)



	








