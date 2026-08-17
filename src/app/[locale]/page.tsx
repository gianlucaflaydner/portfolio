import { setRequestLocale, getTranslations } from 'next-intl/server';

import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Hero from '@/sections/hero';
import Shelf from '@/sections/shelf';
import Career from '@/sections/career';
import Products from '@/sections/products';
import Stack from '@/sections/stack';
import Contact from '@/sections/contact';
import { SITE } from '@/lib/site';
import { EMPLOYERS } from '@/content/work';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('meta');
  const current = EMPLOYERS.find((e) => !e.end);

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    jobTitle:
      locale === 'en'
        ? 'Fullstack Developer'
        : 'Desenvolvedor Fullstack',
    description: t('description'),
    knowsLanguage: ['pt-BR', 'en'],
    ...(current
      ? { worksFor: { '@type': 'Organization', name: current.name } }
      : {}),
    sameAs: [SITE.github, SITE.linkedin],
  };

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Shelf />
        <Career />
        <Products />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  );
}
