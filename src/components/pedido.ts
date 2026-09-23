import type { Lanche } from '../data/lanches';

type Itens = Record<string, number>;

const STORAGE_KEY = 'newburger:pedido';
const EMAIL = 'correiareisg@gmail.com';

const load = (): Itens => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Itens;
  } catch {
    return {};
  }
};

const save = (itens: Itens): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  } catch {
    /* storage indisponível (aba anônima etc.) — segue só em memória */
  }
};

/** Painel lateral de pedidos: adicionar, alterar quantidade, limpar e enviar por e-mail. */
export class Pedido {
  private itens: Itens = load();
  private lastFocus: HTMLElement | null = null;

  private readonly root = document.querySelector<HTMLElement>('[data-pedido]')!;
  private readonly panel = this.root.querySelector<HTMLElement>('.pedido__panel')!;
  private readonly list = this.root.querySelector<HTMLElement>('[data-pedido-list]')!;
  private readonly empty = this.root.querySelector<HTMLElement>('[data-pedido-empty]')!;
  private readonly send = this.root.querySelector<HTMLAnchorElement>('[data-pedido-send]')!;
  private readonly counters = document.querySelectorAll<HTMLElement>('[data-pedido-count]');

  constructor(private readonly catalogo: Lanche[]) {
    document.querySelectorAll('[data-pedido-open]').forEach((el) => el.addEventListener('click', () => this.open()));
    this.root.querySelectorAll('[data-pedido-close]').forEach((el) => el.addEventListener('click', () => this.close()));
    this.root.querySelector('[data-pedido-clear]')!.addEventListener('click', () => this.clear());

    this.list.addEventListener('click', (ev) => {
      const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('[data-qty]');
      if (!btn) return;
      const id = btn.closest<HTMLElement>('[data-item]')!.dataset.item!;
      this.change(id, Number(btn.dataset.qty));
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && !this.root.hidden) this.close();
    });

    this.render();
  }

  add(id: string): void {
    this.change(id, 1);
  }

  get total(): number {
    return Object.values(this.itens).reduce((a, b) => a + b, 0);
  }

  private change(id: string, delta: number): void {
    const qtd = (this.itens[id] ?? 0) + delta;
    if (qtd <= 0) delete this.itens[id];
    else this.itens[id] = qtd;
    save(this.itens);
    this.render();
  }

  private clear(): void {
    this.itens = {};
    save(this.itens);
    this.render();
  }

  open(): void {
    this.lastFocus = document.activeElement as HTMLElement | null;
    this.root.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => {
      this.root.classList.add('is-open');
      this.panel.focus({ preventScroll: true });
    });
  }

  close(): void {
    this.root.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    window.setTimeout(() => (this.root.hidden = true), 250);
    this.lastFocus?.focus();
  }

  private render(): void {
    const entries = Object.entries(this.itens)
      .map(([id, qtd]) => ({ lanche: this.catalogo.find((l) => l.id === id), qtd }))
      .filter((e): e is { lanche: Lanche; qtd: number } => Boolean(e.lanche));

    this.list.innerHTML = entries
      .map(
        ({ lanche, qtd }) => `
        <li class="pedido__item" data-item="${lanche.id}">
          <img src="${lanche.imagem}" alt="" width="64" height="48" />
          <span class="pedido__nome">${lanche.nome}</span>
          <span class="pedido__qty">
            <button type="button" data-qty="-1" aria-label="Remover um ${lanche.nome.toLowerCase()}">−</button>
            <output aria-live="polite">${qtd}</output>
            <button type="button" data-qty="1" aria-label="Adicionar um ${lanche.nome.toLowerCase()}">+</button>
          </span>
        </li>`,
      )
      .join('');

    const vazio = entries.length === 0;
    this.empty.hidden = !vazio;
    this.send.toggleAttribute('aria-disabled', vazio);

    const corpo = entries.map(({ lanche, qtd }) => `${qtd}x ${lanche.nome}`).join('\n');
    this.send.href = vazio
      ? '#'
      : `mailto:${EMAIL}?subject=${encodeURIComponent('Pedido New Burger')}&body=${encodeURIComponent(
          `Olá! Gostaria de fazer o pedido:\n\n${corpo}\n`,
        )}`;

    const total = this.total;
    this.counters.forEach((c) => {
      c.textContent = String(total);
      c.hidden = total === 0;
    });
  }
}
