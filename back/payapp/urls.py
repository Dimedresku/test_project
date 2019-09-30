from django.urls import path
from .views import *

urlpatterns = [
    path('all', ClientListView.as_view(),name='clients-all'),
    path('client/<int:inn>', ClientDetailView.as_view(), name='client-detail'),
]
