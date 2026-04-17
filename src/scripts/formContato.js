import { exibirErroElemForm, exibirMsgErro, exibirMsgSucesso } from './formAlertas.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form_contato');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = form.querySelector('[id="nome"]')?.value?.trim() || '';
    const email = form.querySelector('[name="email"]')?.value?.trim() || '';
    const assunto = form.querySelector('[name="assunto"]')?.value?.trim() || '';
    const mensagem = form.querySelector('[name="mensagem"]')?.value?.trim() || '';
    var elemMsg = '';

    if (!nome) {
      elemMsg = "Por favor, preencha o campo 'nome'.";
      exibirErroElemForm('nome', elemMsg);
    }

    if (!email) {
      elemMsg = "Por favor, preencha o campo 'email'.";
      exibirErroElemForm('email', elemMsg);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      elemMsg = "Por favor, preencha um email válido.";
      exibirErroElemForm('email', elemMsg);
    }

    if (!assunto) {
      elemMsg = "Por favor, preencha o campo 'assunto'.";
      exibirErroElemForm('assunto', elemMsg);
    }

    if (!mensagem) {
      elemMsg = "Por favor, preencha o campo 'mensagem'.";
      exibirErroElemForm('mensagem', elemMsg);
    }

    if (mensagem.length < 10) {
      elemMsg = "A mensagem deve ter pelo menos 10 caracteres.";
      exibirErroElemForm('mensagem', elemMsg);
    }

    if (elemMsg != '') {
      const msg = "Erro no preenchimento do formulário. Por favor verifique e tente novamente.";
      exibirMsgErro(msg);
      return;
    } else {
      try {
        const response = await fetch('/api/formContato', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
            assunto,
            mensagem,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          exibirMsgErro(result.message || 'Não foi possível enviar sua mensagem.');
          return;
        }

        form.reset();
        exibirMsgSucesso(result.message || 'Mensagem enviada com sucesso. Por favor aguarde nosso retorno. Agradecemos.');
      } catch (error) {
        exibirMsgErro('Erro de conexão ao enviar o formulário.');
      }

    }
  });
});