# gianlucalaydner.dev

Portfolio of Gianluca Laydner — frontend developer working in retail e-commerce
on Oracle Commerce Cloud.

## Running it

```bash
yarn install
yarn dev          # http://localhost:3000 → redirects to /pt
yarn build        # production build
yarn start        # serve the production build
yarn lint
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-intl v4
· Motion · Lenis · deployed on Vercel.

Deliberately the same stack as [EverMemo](https://ever-memo.com) and
[Futeboldle](https://futeboldle.com.br) — three projects, one set of tools to
keep current.

## Layout

```
messages/{pt,en}.json     all copy, both locales
middleware.ts             next-intl locale routing
src/
  app/[locale]/           layout, page, generated OG image
  app/{robots,sitemap}.ts
  content/                the facts: employers, storefronts, products, repos, tools
  i18n/                   routing, request config, navigation helpers
  sections/               one file per page section
  components/             shelf, rail tag, header, footer, form, motion helpers
  lib/site.ts             canonical URL and contact details, single source
  styles/globals.css      the whole design token system
```

Content lives in `src/content/` as typed data and copy lives in `messages/`.
Adding a storefront means editing one array in `src/content/work.ts` plus its
sector label in both message files — the stats bar, the shelf and the career
counts all derive from it.

## Design

The visual direction is recorded in `DESIGN.md`, the product truth behind it in
`PRODUCT.md`. The page's direction contract also ships as an HTML comment at the
top of `<body>` in the built output.

Both were produced with [Impeccable](https://github.com/pbakaus/impeccable),
installed under `.claude/skills/`.

## Environment

The contact form posts through EmailJS and needs three public variables, set in
Vercel (and in `.env.local` to test it locally):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_USER_ID
```

Without them the form is replaced by a direct mail link rather than rendering a
control that cannot work.
