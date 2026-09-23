export interface Lanche {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  /** Geometria da imagem dentro do card, conforme o Figma (px, card de 364×505). */
  media: { top: number; width: number; height: number; fit: 'cover' | 'contain' };
  /** Deslocamento do título quando difere do padrão (236px). */
  tituloTop?: number;
}

const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

const PADRAO = { top: 39, width: 238, height: 186, fit: 'cover' } as const;

export const LANCHES: Lanche[] = [
  {
    id: 'bacatu',
    nome: 'HAMBURGUER BACATU',
    descricao:
      'Carne suculenta grelhada, coberta com uma camada generosa de catupiry cremoso, tiras de bacon crocante. Tudo isso dentro de um pão macio, criando uma combinação irresistível de sabores.',
    imagem: img('lanche-bacatu.png'),
    media: PADRAO,
  },
  {
    id: 'salad',
    nome: 'HAMBURGUER SALAD',
    descricao:
      'Carne grelhada, queijo derretido prato, alface, tomate, cebola roxa e pepino frescos, e tiras de bacon crocante. O molho cremoso dá o toque final, tudo envolto em um pão macio. Uma combinação perfeita de frescor, crocância e cremosidade!',
    imagem: img('lanche-salad.png'),
    media: PADRAO,
  },
  {
    id: 'duplo',
    nome: 'HAMBURGUER DUPLO',
    descricao:
      'Duas suculentas carnes grelhadas, queijo derretido entre elas, alface, tomate, cebola roxa, pepino fresco e tiras crocantes de bacon. Para completar, molho cremoso e tudo isso dentro de um pão macio. Uma explosão de sabores e texturas em cada mordida!',
    imagem: img('lanche-duplo.png'),
    media: PADRAO,
  },
  {
    id: 'kid',
    nome: 'HAMBURGUER KID',
    descricao:
      'Um hambúrguer de carne suculenta, queijo derretido, ketchup e maionese, tudo dentro de um pão macio. Acompanhado de batatinhas fritas crocantes e um suquinho, perfeito para os pequenos!',
    imagem: img('lanche-kid.png'),
    media: { top: 32, width: 260, height: 189, fit: 'cover' },
  },
  {
    id: 'chicken',
    nome: 'HAMBURGUER CHICKEN',
    descricao:
      'Peito de frango grelhado, suculento e temperado, com alface, tomate, queijo e maionese, servido em um pão macio. Leve, saboroso e uma opção deliciosa para quem prefere frango!',
    imagem: img('lanche-chicken.png'),
    media: { top: 24, width: 269, height: 174, fit: 'contain' },
    tituloTop: 230,
  },
  {
    id: 'tudo',
    nome: 'HAMBURGUER TUDO',
    descricao:
      'Uma carne suculenta, queijo derretido, bacon crocante, alface, tomate, cebola roxa, picles e uma camada generosa de molho especial. Tudo isso dentro de um pão macio, trazendo uma mistura perfeita de sabores e texturas em cada mordida.',
    imagem: img('lanche-tudo.png'),
    media: { top: 31, width: 301, height: 190, fit: 'contain' },
  },
];
