import { getTranslations } from 'next-intl/server';

import { SplitReveal, Reveal } from '@/components/reveal';
import { EMPLOYERS } from '@/content/work';

/**
 * The arc, not the client list — the rail already named every storefront.
 * Split screen: the left column stays put while the right one scrolls past it,
 * so the three employers read as one continuous run rather than three cards.
 */
export default async function Career() {
  const t = await getTranslations('career');

  return (
    <section
      id="career"
      aria-labelledby="career-title"
      className="border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-[84rem] gap-14 px-6 sm:px-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SplitReveal
            as="h2"
            className="type-display max-w-[14ch] text-[clamp(2.1rem,4.6vw,3.6rem)]"
          >
            {t('title')}
          </SplitReveal>
          <span id="career-title" className="sr-only" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-ink-soft">
              {t('lede')}
            </p>
          </Reveal>
        </div>

        <ol className="list-none">
          {EMPLOYERS.map((employer, i) => (
            <Reveal as="li" key={employer.id} delay={i * 0.05}>
              <div className="border-t border-line py-9 first:border-t-0 first:pt-0 lg:py-12">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="type-note">
                    {employer.start} → {employer.end ?? t('present')}
                  </p>
                  <p className="type-note">
                    {t('storefrontsBuilt', {
                      count: employer.storefronts.length,
                    })}
                    {!employer.end ? (
                      <span className="ml-3 rounded-full bg-accent px-2.5 py-1 text-on-accent">
                        {t('current')}
                      </span>
                    ) : null}
                  </p>
                </div>

                <h3 className="type-display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">
                  {employer.name}
                </h3>
                <p className="mt-2 text-ink-soft">
                  {t(`roles.${employer.id}`)}
                </p>

                {/* Each client keeps its own colour here too, so the run of
                    employers reads as the run of real brands behind it. */}
                <ul className="mt-6 flex list-none flex-wrap gap-x-2 gap-y-2">
                  {employer.storefronts.map((s) => (
                    <li
                      key={s.id}
                      className="type-note flex items-center gap-2 rounded-full border border-line px-3 py-1.5"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: s.brand }}
                      />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
