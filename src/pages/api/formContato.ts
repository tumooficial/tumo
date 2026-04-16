export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log(">>> TRY 01")

    const body = await request.json();

    console.log(">>> body")
    console.log(body)

    const nome = String(body.nome || '').trim();
    const email = String(body.email || '').trim();
    const assunto = String(body.assunto || '').trim();
    const mensagem = String(body.mensagem || '').trim();

    const response = await resend.emails.send({
      from: import.meta.env.CONTACT_FROM_EMAIL,
      to: [import.meta.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `[Site Tumo] ${assunto}`,
      html: `
        <h2>Novo contato pelo site da Tumo</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (response.error) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: 'Não foi possível enviar a mensagem agora.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Mensagem enviada com sucesso. Por favor aguarde nosso retorno. Agradecemos.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Ocorreu um erro inesperado ao processar o formulário.',
        error: error,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};