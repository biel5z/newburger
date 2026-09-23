# New Burger

Landing page da New Burger implementada a partir do protótipo no Figma (frame "Ancora antes").

**Stack:** Vite + TypeScript + SCSS, sem framework.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/ (caminhos relativos, dá pra subir em qualquer pasta)
npm run preview  # testa o build
```

## Estrutura

```
index.html                 # marcação das seções (header, hero, destaques, cardápio, sobre, footer)
public/img/                # imagens e ícones exportados do Figma
src/
  main.ts                  # ponto de entrada
  data/lanches.ts          # dados do cardápio (nome, descrição, imagem, posição da imagem no card)
  components/
    header.ts              # header fixo, menu mobile e link ativo por seção
    cardapio.ts            # renderiza os cards de lanche
    pedido.ts              # painel "Pedidos" (adicionar, +/-, limpar, enviar por e-mail)
  styles/
    _tokens.scss           # cores, fontes, breakpoints
    _base.scss             # reset, botão, toast
    _header.scss _hero.scss _destaques.scss _cardapio.scss _sobre.scss _footer.scss _pedido.scss
    main.scss
```

## Navegação (âncoras)

| Menu       | Destino                        |
|------------|--------------------------------|
| HOME       | `#home` (hero)                 |
| CARDÁPIO   | `#cardapio`                    |
| PEDIDOS    | abre o painel lateral de pedidos |
| PROMOÇÕES  | `#promocoes` (cards de destaque) |
| SOBRE NÓS  | `#sobre`                       |
| CONTATO    | `#contato` (rodapé)            |

## Adicionar um lanche

Inclua um item em `src/data/lanches.ts` e coloque a imagem em `public/img/`.
O campo `media` controla posição/tamanho da imagem no card (padrão do Figma: `top 39, 238×186, cover`).
