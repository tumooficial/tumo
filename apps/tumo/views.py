from django.shortcuts import render, redirect

from apps.tumo.utils import base_context


def home(request):
    return render(request, 'tumo/pages/index.html', {**base_context('tumo-home')})
