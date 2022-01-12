from django.urls import path

from . import views

app_name = 'tumo'

urlpatterns = [
    path('', views.home, name='home'),
    path('ajax/tumo/contato/send_email/', views.send_email, name='contato_send_email'),
]