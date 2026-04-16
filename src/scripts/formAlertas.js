import Swal from 'sweetalert2';

export function exibirMsgErro(msg) {
  Swal.fire({
    icon: 'error',
    title: 'ERRO !',
    text: msg,
    confirmButtonText: 'OK',
  });
}

export function exibirMsgSucesso(msg) {
  Swal.fire({
    icon: 'success',
    title: 'SUCESSO !',
    text: msg,
    confirmButtonText: 'OK',
  });
}

export function exibirErroElemForm(elemId, msg){
  document.getElementById(elemId)?.classList.add("invalid");

  const el = document.getElementById('msg_erro_'+ elemId);
  if (el) {
    el.innerHTML = msg;
    el.classList.remove('d-none');
    el.classList.add('d-block');
  }
}

export function limparErroElemForm(el){
  el.classList.remove('invalid');

  const eleMsg = document.getElementById('msg_erro_' + el.id);
  if (eleMsg) {
    eleMsg.innerHTML = '';
    eleMsg.classList.remove('d-block');
    eleMsg.classList.add('d-none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('focus', (event) => {
    const el = event.target;

    if (!(el instanceof Element)) return;
    if (el.matches('input, select, textarea')) {
      if (el) {
        limparErroElemForm(el)
      }
    }
  }, true);
});