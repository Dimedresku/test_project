from django.test import TestCase
from ..models import Client
from django.contrib.auth.models import User
from django.db.models import DecimalField

class ClientModelTest(TestCase):

	def setUp(self):
		user = User.objects.create(username='user_test_1',  password='ab1234cd')
		client = Client.objects.create(user=user, inn=123456789012, balance=1000.00)

	def test_inn(self):
		inn = Client.objects.get(id=1)
		inn_label = inn._meta.get_field('inn').verbose_name
		self.assertEquals(inn_label,'ИНН')

	def test_balance(self):
		balance = Client.objects.get(id=1)
		balance_label = balance._meta.get_field('balance').verbose_name
		self.assertEquals(balance_label,'Баланс')

	def test_decimal_field(self):
		field = Client.objects.get(id=1)._meta.get_field('balance')
		self.assertTrue(isinstance(field, DecimalField))
