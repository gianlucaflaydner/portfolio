import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';

import GridField from '@/components/grid-field';
import { SplitReveal, Reveal } from '@/components/reveal';

/**
 * The grid is the ground, and the blocks moving across it carry the real
 * storefront colours, so the first thing on screen is already made of the work.
 */
export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden pb-14 pt-36 sm:pb-20">
      {/* Drawn grid, then the blocks that live on it. */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-70"
      />
      <GridField className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* Only enough veil to hand the section off to the next one. A full-height
          wash over the field turned solid cobalt into pale lavender. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper"
      />

      <div className="relative mx-auto w-full max-w-[84rem] px-6 sm:px-10">
        <SplitReveal
          as="h1"
          className="type-display max-w-[17ch] text-[clamp(2.9rem,7.4vw,6.5rem)]"
        >
          {t('headline')}
        </SplitReveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            {t('lede')}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-accent">
              {t('ctaPrimary')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#work" className="btn btn-quiet">
              {t('ctaSecondary')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
