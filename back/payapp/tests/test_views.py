import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Client as db
from django.contrib.auth.models import User
from ..serializers import ClientDetailSerializer, ClientListSerializer

client = Client()

class GetAllClientsTest(TestCase):

	def setUp(self):
		user1 = User.objects.create(username='user_test_1',  password='ab1234cd')
		user2 = User.objects.create(username='user_test_2',  password='ab1234cd')
		client1 = db.objects.create(user=user1, inn=123456789012, balance=1000.00)
		client2 = db.objects.create(user=user2, inn=123456789000, balance=1500.00)

	def test_get_all_clients(self):
		response = client.get(reverse('clients-all'))
		clients = db.objects.all()
		serializer = ClientListSerializer(clients, many=True)
		self.assertEqual(response.data, serializer.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSingleClientTest(TestCase):

	def setUp(self):
		user1 = User.objects.create(username='user_test_1',  password='ab1234cd')
		self.client1 = db.objects.create(user=user1, inn=123456789012, balance=1000.00)

	def test_get_valid_single_client(self):
		response = client.get(
			reverse('client-detail', kwargs={'inn': self.client1.inn}))
		clientdb = db.objects.get(inn=self.client1.inn)
		serializer = ClientDetailSerializer(clientdb)
		self.assertEqual(response.data, serializer.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_get_invalid_single_client(self):
		response = client.get(
			reverse('client-detail', kwargs={'inn': 100}))
		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class UpdateSinglClientTest(TestCase):

	def setUp(self):
		user1 = User.objects.create(username='user_test_1',  password='ab1234cd')
		self.client1 = db.objects.create(user=user1, inn=123456789012, balance=1000.00)
		self.valid_payload = {
				'user':'user1',
				'inn':123456789012,
				'balance': 200.00
		}
		self.invalid_payload = {
				'user':'user1',
				'inn':123456789012678,
				'balance': 200.00
		}

		def test_valid_update_client(self):
			response = client.put(
				reverse('client-detail', kwargs={'inn': self.client1.inn}),
				data=json.dumps(self.valid_payload),
				content_type='application/json' )
			self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

		def test_invalid_update_client(self):
			response = client.put(
				reverse('client-detail', kwargs={'inn': self.client1.inn}),
				data=json.dumps(self.invalid_payload),
				content_type='application/json' )
			self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
