from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
	user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)
	inn = models.CharField(verbose_name="ИНН", max_length=12, unique=True)
	balance = models.DecimalField(verbose_name="Баланс",max_digits=10, decimal_places=2, default=0)

	def __str__(self):
		return self.inn