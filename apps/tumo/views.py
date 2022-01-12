from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.template.loader import get_template
from django.core.mail import send_mail
from django.conf import settings

from apps.tumo.utils import base_context, get_msg_erro

from .forms import ContatoForm


def home(request):
    context = {'contato_form': ContatoForm}

    return render(request, 'tumo/pages/index.html', {**base_context('tumo-home'), **context})

def send_email(request):
    if request.is_ajax():
        form = ContatoForm(request.POST)
        form_valid = form.is_valid()
        if form_valid:
            nome = form.cleaned_data['nome']
            email = form.cleaned_data['email']
            assunto = f"### Site Tumo: Contato de {email} - {nome}"
            template = get_template('tumo/pages/template_send_email.html')
            mensagem = template.render(form.cleaned_data)

            try:
                send_mail(
                    assunto,
                    mensagem,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL],
                    fail_silently=False,
                )
                msg = '<p class="mb-0">Mensagem enviada com sucesso!</p><p>Agradecemos o contato.</p>'
                return JsonResponse({"message": msg}, status = 200)
            except:
                msg = '<p class="mb-0">Erro ao enviar mensagem. Por favor tente mais tarde.</p>'
                return JsonResponse({"error": msg}, status = 500)
        else:
            return JsonResponse({"error": get_msg_erro(form, show_nome_campo = False)}, status = 500)
