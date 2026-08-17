/**
 * Products Gianluca owns and operates. These outrank client work and open
 * repositories in the page hierarchy — both repos are private, so every link
 * points at the running product, never at GitHub.
 */

export interface Product {
  id: string;
  name: string;
  url: string;
  /** Shown as the visited domain, not as a raw href. */
  domain: string;
  stack: string[];
  /** The product's own colour, taken from its live interface. */
  brand: string;
  /** Captured from the running product, not a mockup. */
  shot: string;
  /** Registered business behind the product, when there is one. */
  cnpj?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'evermemo',
    name: 'EverMemo',
    url: 'https://ever-memo.com',
    domain: 'ever-memo.com',
    stack: [
      'Next.js 16',
      'Prisma',
      'PostgreSQL',
      'next-intl',
      'GSAP',
      'Resend',
      'Vercel Blob',
    ],
    brand: '#e0114b',
    shot: '/images/evermemo.webp',
  },
  {
    id: 'futeboldle',
    name: 'Futeboldle',
    url: 'https://futeboldle.com.br',
    domain: 'futeboldle.com.br',
    stack: ['Next.js 16', 'Tailwind v4', 'Curadoria Wikidata'],
    brand: '#0f5132',
    shot: '/images/futeboldle.webp',
    cnpj: '65.412.708/0001-03',
  },
];
