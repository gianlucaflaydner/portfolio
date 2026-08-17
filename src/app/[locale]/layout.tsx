import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Young_Serif, Schibsted_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { routing } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import MotionProvider from '@/components/motion-provider';
import '@/styles/globals.css';

// Solid stems and low contrast: the display face has to carry weight at size,
// and a high-contrast serif went spindly where the page needed presence.
const display = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-face',
  display: 'swap',
});

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});


const DIRECTION_CONTRACT = `
THESIS: A portfolio built on a drawn modular grid. It refuses the dark, tightly-packed developer portfolio and the "Selected Work" card grid alike; the page's ground is a hairline field that content aligns to and one saturated colour snaps into.
OWN-WORLD: Warm paper #FBF7EF, ink #16150F, and thirteen real storefront colours measured off the live sites, each card wearing its own. Young Serif for display, Schibsted Grotesk for everything else including labels — no monospace anywhere. Panels are 24px-radius fields; the nav is a floating pill, not a bar; contact is the one full-colour surface.
STORY: A Brazilian recruiter sees thirteen named storefronts across three countries travel past on one rail, then two products he owns outright, and makes contact.
FIRST VIEWPORT: The living grid — hairline cells with cobalt blocks being born, travelling a cell, and dissolving — under a serif headline set left, with the facts pinned to the grid as mono annotations and a cobalt pill as the action.
FORM: Modular grid field, drawn from the reference set the user pinned (godaylight.com, oldtomcapital.com, americanhousing.com). Replaces the previous "gôndola" world at the user's direction.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: `%s · ${SITE.name}` },
    description: t('description'),
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        'pt-BR': '/',
        en: '/en',
        // The audience is recruiters and clients, in Brazil and abroad, so a
        // visitor whose language matches neither still needs somewhere to land.
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: locale === routing.defaultLocale ? '/' : `/${locale}`,
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.png' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      className={`${display.variable} ${schibsted.variable}`}
    >
      <body className="antialiased">
        <div
          dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }}
        />
        <NextIntlClientProvider>
          <MotionProvider />
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
