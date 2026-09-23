import type { Lanche } from '../data/lanches';

const cardTemplate = (l: Lanche): string => {
  const { top, width, height, fit } = l.media;
  const mediaStyle = `--media-top:${top}px;--media-w:${width}px;--media-h:${height}px;--media-fit:${fit}`;
  const tituloStyle = l.tituloTop ? ` style="--titulo-top:${l.tituloTop}px"` : '';

  return `
    <li class="lanche" data-lanche="${l.id}">
      <div class="lanche__media" style="${mediaStyle}">
        <img src="${l.imagem}" alt="${l.nome.toLowerCase()}" width="${width}" height="${height}" loading="lazy" />
      </div>
      <h3 class="lanche__nome"${tituloStyle}>${l.nome}</h3>
      <p class="lanche__desc">${l.descricao}</p>
      <button class="btn lanche__cta" type="button" data-add="${l.id}">ENCOMENDE AGORA</button>
    </li>`;
};

export function renderCardapio(root: HTMLElement, lanches: Lanche[], onAdd: (id: string) => void): void {
  root.innerHTML = lanches.map(cardTemplate).join('');

  root.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('[data-add]');
    if (btn?.dataset.add) onAdd(btn.dataset.add);
  });
}
