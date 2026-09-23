import './styles/main.scss';

import { LANCHES } from './data/lanches';
import { renderCardapio } from './components/cardapio';
import { initHeader } from './components/header';
import { Pedido } from './components/pedido';

const toastEl = document.querySelector<HTMLElement>('[data-toast]')!;
let toastTimer = 0;
const toast = (msg: string) => {
  toastEl.textContent = msg;
  toastEl.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
};

initHeader();

const pedido = new Pedido(LANCHES);

renderCardapio(document.querySelector<HTMLElement>('[data-cardapio]')!, LANCHES, (id) => {
  pedido.add(id);
  const nome = LANCHES.find((l) => l.id === id)?.nome ?? 'Lanche';
  toast(`${nome} adicionado ao pedido (${pedido.total})`);
});

document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));
