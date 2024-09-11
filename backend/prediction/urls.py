# backend/prediction/urls.py
from django.urls import path
from .views import predict_readmission

urlpatterns = [
    path('predict/', predict_readmission),
]
