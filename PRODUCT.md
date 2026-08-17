# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Duas audiências de peso igual, e nenhuma delas é secundária:

1. **Recrutadores técnicos, tech leads e gestores de engenharia**, avaliando Gianluca para uma vaga de desenvolvedor pleno/sênior. Chegam por LinkedIn ou indicação, abrem o site no meio de uma triagem, e decidem em segundos se vale ler o resto.
2. **Quem contrata projeto** — empresa ou agência precisando de alguém que entregue e-commerce de varejo em produção.

**No Brasil e fora dele**, também em peso igual. Isso significa que PT e EN são igualmente de primeira classe: nenhuma tradução é rascunho da outra, e qualquer copy nova nasce nos dois idiomas ao mesmo tempo. A detecção de idioma manda o visitante para o seu, e `x-default` aponta para o inglês.

## Product Purpose

Portfólio pessoal de Gianluca Laydner. O sucesso é uma conversa iniciada — sobre uma vaga ou sobre um projeto — depois que o visitante entende em 15 segundos a escala e a especialidade do trabalho.

Como as duas audiências chegam pela mesma porta, a página não pode se dirigir a só uma: a evidência (13 lojas no ar, 3 países, 2 produtos próprios) serve às duas, e o convite final fala de vaga **e** de projeto.

A versão anterior falhava nisso: se descrevia como "desenvolvedor apaixonado por tecnologia com um olhar atento para o design", omitia todos os empregadores, omitia 7 dos 13 clientes, e dava o mesmo peso visual a trabalhos de faculdade e a storefronts em produção.

## Positioning

Desenvolvimento fullstack de **e-commerce de varejo em escala**, na plataforma Oracle Commerce Cloud (OCC) e Oracle Storefront (OSF) — um nicho estreito e difícil de copiar: 13 storefronts em produção, em 3 países, para redes de varejo reais onde pessoas de verdade transacionam.

Combinado a algo que quase nenhum portfólio de dev pleno tem: **dois produtos próprios no ar**, concebidos, construídos e operados do zero — um com CNPJ e fluxo de pagamento.

## Operating Context

Trabalho de agência/consultoria: cada empregador atende uma carteira de clientes de varejo, e Gianluca implementa e customiza os storefronts desses clientes. O trabalho não é visível como "produto do Gianluca" — é visível como a loja da marca. Isso torna a atribuição (qual loja, qual país, qual ano) a evidência central do portfólio.

Os produtos próprios são operados em paralelo, fora do horário de trabalho.

## Capabilities and Constraints

**Stack do site:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-intl v4 · Motion · Lenis · deploy na Vercel. Escolhida deliberadamente para espelhar a stack do EverMemo e do Futeboldle — três projetos, uma stack só de manter.

**Bilíngue PT/EN**, renderizado no servidor (a versão anterior traduzia no cliente, o que quebrava SEO).

**Formulário de contato** via EmailJS. As três variáveis (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_USER_ID`) vivem no Vercel, não no repositório.

**Terminologia:** storefront, PDP, PLP, OCC, OSF, checkout. "Storefront" é a unidade de trabalho — não "site" nem "projeto".

## Brand Commitments

- Nome: **Gianluca Laydner**. Domínio canônico: `gianlucalaydner.dev`.
- Cargo atual: Desenvolvedor Pleno.
- Autorizado a nomear publicamente os clientes **e** a qual empregador cada um pertence.
- Produtos próprios com identidade independente, que o portfólio referencia mas não imita: **EverMemo** (`ever-memo.com`) e **Futeboldle** (`futeboldle.com.br`).

## Evidence on Hand

**Empregadores (3):**

| Empresa | Período | Cargo |
|---|---|---|
| Lighthouse IT | 2022 – 2025 | Estagiário → Junior → Pleno |
| JBQ Global | 2025 | Desenvolvedor Pleno |
| Aggrandize | 2026 – hoje | Desenvolvedor Pleno |

**Storefronts em produção (13), por empregador:**

- **Lighthouse IT** — Salon Line (BR, beleza) · Zema (BR, varejo) · Entel (CL, telecom) · Esplanada Móveis (BR, móveis) · D'avó Supermercados (BR, supermercado) · Confiança Delivery (BR, supermercado)
- **JBQ Global** — iPlace BR (BR, Apple Premium Reseller) · iPlace UY (UY, Apple Premium Reseller) · Taqi (BR, varejo) · Volis (BR, colchões) · Voulevar (BR, móveis)
- **Aggrandize** — Frigelar (BR, refrigeração e climatização) · EOS (BR, eletrodomésticos — submarca da Frigelar)

**Produtos próprios (2), ambos no ar:**

- **EverMemo** — `ever-memo.com`. Presentes digitais: fotos, música e mensagem viram uma página que existe só para uma pessoa, acessada por QR code impresso. Templates por ocasião, planos Básico/Premium com fluxo de pagamento. Next 16 · Prisma/Postgres · next-intl · GSAP + Lenis · Resend · Vercel Blob · Zod · Zustand. Repositório privado.
- **Futeboldle** — `futeboldle.com.br`. Jogo diário gratuito: adivinhe o jogador secreto comparando cinco atributos, nos modos Copa do Mundo e Brasileirão Série A; no modo Escalação Retrô o jogo sorteia clube e ano e desafia a montar o time. Dados de Wikipedia/Wikidata com curadoria própria. CNPJ 65.412.708/0001-03. Next 16 · Tailwind v4. Repositório privado.

**Repositórios públicos curados (3):** Vista Aerea Filmes (cliente real) · Movies List (GraphQL/Apollo + Jest) · Bitcent (Firebase). Ficam fora do destaque: Pokedex, Sorteador de Amigo Secreto, Hotel Chimia — trabalhos de aprendizado que hoje contradizem o nível pleno.

**Assets existentes:** `public/images/profile_picture.jpeg`, CVs em PT e EN (`Gianluca-{pt,en}-cv.pdf`), logos de 6 dos 13 clientes.

**Ausências que trabalhos futuros não podem inventar:**
- Não há logo dos 7 clientes novos — a decisão foi usar wordmarks tipográficos para os 13, não misturar logos.
- Não há métrica de negócio (GMV, conversão, tráfego) de nenhum storefront. Não afirmar impacto numérico.
- Não há depoimento, estudo de caso, prêmio ou menção de imprensa.
- URLs de Volis, Voulevar e EOS não foram confirmadas.

## Product Principles

1. **Atribuição é a prova.** O valor do trabalho está em nomear a loja, o país e o ano. Genérico ("desenvolvi e-commerces") destrói exatamente a evidência que o visitante precisa.
2. **Produção acima de exercício.** Um storefront no ar vale mais que um repositório bonito. A hierarquia visual segue essa ordem, sempre.
3. **Dono, não só executor.** Os dois produtos próprios são o diferencial contra outros candidatos pleno. Nunca tratá-los como "projetos pessoais" na mesma prateleira de trabalhos de faculdade.
4. **Só fatos verificáveis.** Sem número de impacto inventado, sem depoimento fabricado, sem cliente que não existiu.
5. **Uma stack só.** O portfólio roda a mesma stack dos produtos. Ele é, ele próprio, uma amostra do trabalho.

## Accessibility & Inclusion

Sem requisito normativo estabelecido pelo usuário. Piso técnico assumido: navegação completa por teclado com foco visível, `prefers-reduced-motion` respeitado (a página tem parallax), contraste AA em ambos os temas, e menu mobile funcional — a versão anterior não tinha navegação alguma abaixo de 768px.
