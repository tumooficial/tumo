from django import forms
from django.core.exceptions import ValidationError

class ContatoForm(forms.Form):
    nome = forms.CharField(
        label='Nome *',
        required=True,
        widget=forms.TextInput(
            attrs={
                'id': 'nome',
                'class': 'form-control',
                'placeholder': 'Nome *',
                'minlength':'3',
                'maxlength': '75'
            }
        ),
        error_messages={
            'required': 'Por favor preencha o campo nome.',
        }
    )
    email = forms.EmailField(
        label='Email *',
        required=True,
        widget=forms.EmailInput(
            attrs={
                'id': 'email',
                'class': 'form-control',
                'placeholder': 'Email *',
                'maxlength': '100'
            }
        ),
        error_messages={
            'required': 'Por favor preencha o campo email.',
            'invalid': 'Email inválido, por favor verifique o campo e tente novamente.'
        },
    )
    mensagem = forms.CharField(
        label='Mensagem...',
        required=True,
        widget=forms.Textarea(
            attrs={
                'id': 'mensagem',
                'class': 'form-control',
                'placeholder': 'Mensagem *',
                'style': 'height: 250px',
            }
        ),
        error_messages={
            'required': 'Por favor preencha o campo mensagem.'
        }
    )

    def clean_nome(self):
        if len(self.cleaned_data['nome']) not in range(3,76):
            raise ValidationError('O campo nome deve ter entre 3 e 75 caracteres, por favor verifique o campo e tente novamente.')
        return self.cleaned_data['nome']