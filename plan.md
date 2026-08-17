# Reformulação completa do portfólio

## Contexto

O site atual (`Next 15 Pages Router + Tailwind v3`) está desatualizado em três frentes ao mesmo tempo:

**Posicionamento.** O site se vende como "desenvolvedor apaixonado por tecnologia com um olhar atento para o design" — genérico, e muito abaixo do que os dados mostram. Gianluca é especialista em **frontend de e-commerce de varejo em escala**, com 13 storefronts em produção em 3 países, e é dono de **dois produtos próprios no ar** (EverMemo e Futeboldle) que o site sequer menciona.

**Conteúdo.** Faltam 7 clientes (iPlace BR, iPlace UY, Volis, Voulevar, Taqi, Frigelar, EOS), faltam os 3 empregadores da timeline (hoje só há "Estagiário / Junior / Pleno" solto, sem empresa), e os projetos em destaque são trabalhos de faculdade que puxam o nível percebido pra baixo.

**Técnica.** Splash screen preta de 2s bloqueando todo o conteúdo (LCP terrível), i18n client-side que não renderiza no servidor (SEO ruim), **nenhuma tag `<title>` em lugar nenhum**, `<html lang="pt">` fixo mesmo em `/en`, sem menu mobile (`hidden md:flex` some com a navegação abaixo de 768px), `getStaticProps` que retorna props que ninguém consome, e `react-i18next` instalado sem nunca ser importado.

**Resultado esperado:** um portfólio que em 15 segundos comunica "esse cara constrói as lojas onde a América Latina compra, e ainda toca dois produtos próprios" — com identidade visual própria, moderna, e uma seção-assinatura em parallax.

---

## Decisões travadas com o usuário

| Tema | Decisão |
|---|---|
| Direção visual | **Vitrine** — sinalização de varejo, prateleira em parallax |
| Stack | Migrar tudo: **Next 16 + App Router + Tailwind v4 + next-intl** |
| Idiomas | Manter **PT + EN** (agora server-side) |
| Logos dos clientes | **Wordmarks tipográficos**, sem arquivos de logo |
| Projetos | Foco em **EverMemo + Futeboldle**; 3 repos públicos curados como apoio |
| Imagens dos produtos | **Eu capturo** dos sites no ar |
| Extras | Tema claro/escuro · SEO completo · Seção de números |
| Fora de escopo | Futeboldle jogável embutido (não selecionado) |

---

## Direção visual — "Vitrine"

A tese: **o portfólio é uma loja**. Não uma metáfora decorativa — a estrutura da página encoda o que ele faz. A navegação é a fachada, os clientes ficam numa prateleira física, os produtos próprios ganham vitrine dupla, o contato é o balcão.

### Tokens de cor

Tema escuro é o padrão. Blocos chapados de cor (sinalização de varejo), não accent fino brilhando no escuro.

```
--ink          #14120E   fundo, quase-preto com viés oliva (não azulado, não #000)
--ink-raised   #1E1B15   superfície da prateleira
--chalk        #EDE8DC   texto principal, off-white quente
--amber        #FFB100   âmbar de etiqueta de preço — usado como PREENCHIMENTO
--tag          #D6412B   tijolo, só nos marcadores de etiqueta (uso raro)
--muted        #8C8578   cinza quente, metadados
```

Tema claro inverte `ink`/`chalk` mantendo âmbar e tijolo idênticos — a identidade não muda de temperatura entre temas.

**Por que não é o default de IA:** os três clusters conhecidos são (1) fundo creme + serifada + terracota, (2) quase-preto + um accent neon fino, (3) broadsheet com fios de cabelo. Aqui não há serifada, não há terracota, e o âmbar aparece como **bloco chapado de cor** — não como linha/glow de accent. A diferença real não está na paleta: está na **estrutura de prateleira com profundidade física**, que é o que se lembra da página.

### Tipografia

| Papel | Família | Uso |
|---|---|---|
| Display | **Archivo** (variável, eixo de largura) | Manchetes em Expanded 800 caixa-alta; rótulos de prateleira em Condensed |
| Corpo | **Instrument Sans** | Texto corrido, quieto |
| Utilitário | **Martian Mono** | Metadados curtos: anos, códigos de país, rótulos tipo etiqueta |

Uma família variável para display dá manchete expandida e rótulo condensado com um download só. Todas via `next/font/google` (self-hosted, sem CDN). Nenhuma é Inter, Space Grotesk, Playfair ou DM Sans.

### Assinatura: a prateleira em parallax

Os 13 clientes ficam em **três fileiras sobre prateleiras desenhadas**, cada fileira recuando em profundidade e transladando em velocidade diferente conforme a rolagem. A borda da prateleira é um elemento real — fio âmbar de 2px com lábio 3D — e cada wordmark projeta sombra pra baixo, como produto em gôndola.

```
   ← fileira 1 (lenta, mais próxima) ────────────────
     iPlace BR      Taqi        Entel       Salon Line
     BR·2025        BR·2025     CL·2023     BR·2022
   ══════════════════════════════════════════════════
   ← fileira 2 (média) ──────────────────────────────
      Frigelar     D'avó       Zema      iPlace UY
      BR·2026      BR·2024     BR·2023   UY·2025
   ══════════════════════════════════════════════════
   ← fileira 3 (rápida, mais ao fundo) ──────────────
```

### Dispositivo estrutural

Nada de `01 / 02 / 03` genérico. Sob cada wordmark vai **código de país + ano** (`BR·2023`, `UY·2025`, `CL·2023`) — vernáculo de varejo/logística, e encoda algo verdadeiro: ele entregou em três países. Numeração sequencial só aparece na timeline, onde a ordem realmente carrega informação.

### Remoção deliberada

**A splash screen de 2s sai inteira.** É a única "peça de acessório" que se remove antes de sair de casa: some com o efeito mais chamativo do site atual e, de quebra, é o maior ganho isolado de LCP.

---

## Fase 0 — Instalar IMPECCABLE

O IMPECCABLE **não está instalado** (verifiquei `~/.claude/skills`, `~/.claude/plugins/cache` e o projeto — não existe).

```bash
npx impeccable install       # detecta o Claude Code e instala a skill
```

Depois, dentro do projeto:

1. `/impeccable init` → gera `PRODUCT.md` (público, posicionamento, voz) e `DESIGN.md` (paleta, tipografia, componentes, anti-padrões). Alimentar com a direção Vitrine acima, para que os tokens virem a fonte de verdade do projeto.
2. `/impeccable shape` antes de construir cada seção grande.
3. `/impeccable craft` no loop de construção.
4. `/impeccable critique` → `/impeccable audit` → `/impeccable polish` no fechamento. O detector de anti-padrões (58 regras) roda como portão antes do deploy.

---

## Fase 1 — Migração de stack

**Alvo:** Next 16 · React 19 · App Router · Tailwind v4 · next-intl v4 — exatamente a stack que `ever-memo` e `futeboldle` já rodam. Três projetos, uma stack só pra manter.

**Adicionar:** `next-intl`, `motion`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`, `tailwindcss@4`, `@tailwindcss/postcss`, `@vercel/speed-insights`

**Remover:** `swiper` (o carrossel de skills com autoplay é anti-padrão de a11y — vira lista estática agrupada), `react-i18next` (dependência morta, nunca importada), `react-icons` (ícones de UI vêm do `lucide-react`; os 3 ícones de marca — GitHub, LinkedIn, WhatsApp — vão como SVG inline, já que o lucide não tem mais brand icons)

**Trocar:** `emailjs-com` → `@emailjs/browser` (o pacote atual está deprecado; as mesmas 3 env vars continuam valendo)

**Estrutura nova** — espelha a de `ever-memo` de propósito:

```
src/
  app/
    layout.tsx                  raiz
    [locale]/
      layout.tsx                NextIntlClientProvider, fontes, tema, Lenis
      page.tsx                  server component, compõe as seções
      opengraph-image.tsx       OG gerada
    robots.ts
    sitemap.ts
  components/    shelf, wordmark, section-head, theme-toggle, nav, mobile-menu, footer
  sections/      hero, shelf, timeline, products, stack, contact
  content/       clients.ts, timeline.ts, products.ts, projects.ts, profile.ts
  lib/site.ts    URL canônica e constantes
middleware.ts
messages/pt.json, messages/en.json
```

**Padrões a reusar dos projetos irmãos:**
- `futeboldle/lib/site.js` — objeto único `SITE` alimentando metadata, footer e páginas legais. Replicar como `src/lib/site.ts`.
- `ever-memo/middleware.ts` + `messages/{pt,en}.json` — setup de next-intl já resolvido, copiar a forma.
- `ever-memo` já usa `motion` + `lenis` + `gsap` juntos; aqui `motion` + `lenis` bastam.

**Apagar:** todo `src/pages/`, `src/widgets/`, `src/hooks/useTranslation.ts`, `public/locales/`, `tailwind.config.ts` (Tailwind v4 é CSS-first via `@theme` em `globals.css`), e o `getStaticProps` morto.

**Config a corrigir:** `next.config.ts` hoje usa `module.exports` num arquivo `.ts` e só contém o bloco `i18n` — que **não existe no App Router**. Reescrever com `NextConfig` tipado + plugin do next-intl.

---

## Fase 2 — Camada de conteúdo

Tudo hoje está hardcoded dentro de [index.tsx](src/pages/index.tsx#L51-L148). Vai pra `src/content/`, tipado, com os textos referenciando chaves do next-intl.

### `timeline.ts` — 3 empregadores

| # | Empresa | Período | Cargo |
|---|---|---|---|
| 1 | Lighthouse IT | 2022 – 2025 | Estagiário → Junior → Pleno |
| 2 | JBQ Global | 2025 | Desenvolvedor Pleno |
| 3 | Aggrandize | 2026 – hoje | Desenvolvedor Pleno |

### `clients.ts` — 13 storefronts, agrupados por empregador

**Lighthouse IT:** Salon Line (BR, beleza) · Zema (BR, varejo) · Entel (CL, telecom) · Esplanada Móveis (BR, móveis) · D'avó Supermercados (BR, supermercado) · Confiança Delivery (BR, supermercado)

**JBQ Global:** iPlace BR (BR, Apple Premium Reseller) · iPlace UY (UY, Apple Premium Reseller) · Taqi (BR, varejo) · Volis (?) · Voulevar (?)

**Aggrandize:** Frigelar (BR, refrigeração) · EOS (?)

> ⚠️ **Pendência de conteúdo:** faltam setor e URL de **Volis**, **Voulevar** e **EOS**. Vou pedir na hora de preencher o arquivo — não vou inventar dado de cliente real. O layout funciona sem, os campos ficam opcionais.

### `products.ts` — os dois produtos (o coração do site)

**EverMemo** — `ever-memo.com`
Presentes digitais: fotos, música e mensagem viram uma página que existe só pra uma pessoa, acessada por QR code impresso. Templates por ocasião (Dia das Mães, Namorados, Pais), planos Básico/Premium com fluxo de pagamento.
*Next 16 · Prisma/Postgres · next-intl · GSAP + Lenis · Resend · Vercel Blob · Zod · Zustand*

**Futeboldle** — `futeboldle.com.br`
Jogo diário gratuito: adivinhe o jogador secreto comparando 5 atributos, nos modos Copa do Mundo e Brasileirão Série A. No modo Escalação Retrô, o jogo sorteia clube e ano e desafia você a montar o timaço. Dados de Wikipedia/Wikidata com curadoria própria. CNPJ próprio.
*Next 16 · Tailwind v4 · dados estáticos curados*

Ambos os repositórios são **privados** — os cards linkam pro produto no ar, nunca pro GitHub.

### `projects.ts` — 3 repos públicos curados

Vista Aerea Filmes (cliente real) · Movies List (GraphQL/Apollo + Jest) · Bitcent (Firebase). Ficam de fora: Pokedex, Sorteador de Amigo Secreto e Hotel Chimia.

### `profile.ts`
GitHub `gianlucaflaydner` · LinkedIn `gianluca-laydner` · `gianlucaflaydner@gmail.com` · `+55 51 99906-5735` · CVs PT/EN

### Números
`13 storefronts em produção` · `3 países (BR · UY · CL)` · `4 anos` · `2 produtos próprios`

---

## Fase 3 — Seções

Ordem da página, cada uma como a loja pede:

1. **Fachada (hero)** — manchete em Archivo Expanded caixa-alta. Ponto de partida da copy: *"Construo as lojas onde a América Latina compra."* / *"I build the storefronts Latin America shops in."* Subtítulo com a especialidade (frontend de e-commerce, OCC/OSF) e o período. Sem splash, conteúdo pintando no primeiro frame.
2. **Números** — barra fina logo abaixo do hero, em Martian Mono.
3. **Prateleira** — a assinatura. 13 wordmarks em 3 fileiras com parallax.
4. **Bastidores** — timeline dos 3 empregadores, com os clientes de cada um encadeados.
5. **Produtos próprios** — a seção com mais espaço da página. EverMemo e Futeboldle com screenshot real, pitch, stack e link pro site no ar.
6. **Repositórios** — os 3 curados, compactos.
7. **Ferramentas** — stack agrupada (Core · Commerce · Estilo · Ferramentas), estática, sem carrossel.
8. **Balcão** — contato: formulário EmailJS + links diretos.

**Componentes com dívida a pagar:** `projectCard.tsx` usa a API do Next 12 (`layout="fill"` / `objectFit="cover"`, ambas removidas) e tem um `div onClick` sem `role`/handler de teclado envolvendo um `<a>` — alvos de clique aninhados. Reescrito do zero.

**Menu mobile:** hoje **não existe** — `hidden md:flex` faz a navegação inteira sumir abaixo de 768px. Entra um menu mobile de verdade, com trap de foco e fechamento no Esc.

---

## Fase 4 — Movimento

Orquestrado, não espalhado. Três momentos:

1. **Prateleira em parallax** — `useScroll` + `useTransform` do `motion`, `translate3d` nas 3 fileiras em taxas diferentes.
2. **Revelação na rolagem** — cabeçalhos de seção e linhas da timeline aparecendo uma vez, com stagger curto.
3. **Micro-interação de hover** — wordmark do cliente levantando da prateleira, com a sombra acompanhando.

Rolagem suave com `lenis` (mesma lib do ever-memo). **`prefers-reduced-motion: reduce` desliga parallax e reveals** e entrega tudo estático — não é opcional.

---

## Fase 5 — SEO, tema e infraestrutura

- **`<title>`** — hoje literalmente não existe nenhum. Entra template por locale.
- **OG/Twitter cards** + `opengraph-image.tsx` gerada na direção Vitrine.
- **`sitemap.ts` + `robots.ts`** — nenhum dos dois existe (o futeboldle já tem os dois, copiar a forma).
- **JSON-LD `Person`** com `jobTitle`, `worksFor`, `sameAs`.
- **`lang` correto por locale** — `_document.tsx` hoje força `lang="pt"` mesmo em `/en`.
- **Tema claro/escuro** — atributo `data-theme` + script inline anti-FOUC + preferência salva, respeitando `prefers-color-scheme`.
- **Limpeza:** renomear `public/images/confiança.svg` → `confianca.svg` (nome acentuado quebra em alguns deploys); apagar `package-lock.json` e ficar só com `yarn.lock`; substituir o README boilerplate do create-next-app.

---

## Fase 6 — Screenshots

Ambos os produtos estão no ar, então capturo direto de `ever-memo.com` e `futeboldle.com.br` — mais rápido e mais fiel que subir local (o ever-memo precisaria de Postgres). Capturo desktop e mobile, otimizo pra `.webp`, e salvo em `public/images/`. De quebra vejo a linguagem visual de cada produto pra o card conversar com ela.

---

## Verificação

```bash
yarn install
yarn dev      # conferir /pt e /en
yarn build    # é aqui que a migração Next 16 + Tailwind v4 quebra, se quebrar
```

Checklist manual antes de considerar pronto:

- [ ] `/pt` e `/en` renderizam **traduzidos no HTML do servidor** (View Source, não DevTools) — é o bug de SEO que estamos consertando
- [ ] `<html lang>` acompanha o locale
- [ ] `<title>` e OG presentes em ambos os locales; `/sitemap.xml` e `/robots.txt` respondem
- [ ] Lighthouse: **LCP < 2.5s** (sem a splash de 2s deve cair muito), a11y 100
- [ ] Navegação por teclado atravessa a prateleira inteira com foco visível
- [ ] `prefers-reduced-motion: reduce` → parallax e reveals desligados, página utilizável
- [ ] Toggle de tema persiste no reload, sem flash
- [ ] Menu mobile abre/fecha em 375px e prende o foco
- [ ] Formulário de contato **envia de verdade** via EmailJS (as 3 env vars vivem no Vercel, não no repo — testar com `.env.local`)
- [ ] Responsivo em 375 / 768 / 1440
- [ ] `/impeccable audit` e o detector de anti-padrões passam limpo

---

## Riscos

| Risco | Mitigação |
|---|---|
| Tailwind v3 → v4 é breaking (config vira CSS-first) | Reescrever `globals.css` com `@theme` do zero em vez de portar o `tailwind.config.ts` |
| Next 15 → 16 pode ter breaking changes | `ever-memo` e `futeboldle` já rodam Next 16 sem problema — usar como referência viva |
| Setor/URL de Volis, Voulevar e EOS faltando | Perguntar antes de preencher `clients.ts`; campos opcionais, layout não depende |
| Env vars do EmailJS não estão no repo | Confirmar que continuam configuradas no Vercel antes do deploy |
