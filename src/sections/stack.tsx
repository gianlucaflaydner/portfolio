import { getTranslations } from 'next-intl/server';

import SectionHeading from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { STACK } from '@/content/stack';
import { brandSurface, readableOn, tint } from '@/lib/contrast';

/**
 * Four panels, each in its own colour, with Commerce rendered solid because it
 * is the specialism the whole page argues for. Everything else is a wash of
 * the same hue, so the section reads as one family rather than four swatches.
 */
export default async function Stack() {
  const t = await getTranslations('stack');

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[84rem] px-6 sm:px-10">
        <SectionHeading id="stack" title={t('title')} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group, i) => {
            const solid = brandSurface(group.accent);
            const fg = group.lead ? readableOn(solid) : 'var(--color-ink)';
            const bg = group.lead ? solid : tint(group.accent, 0.11);
            const label = group.lead ? readableOn(solid) : solid;

            return (
              <Reveal key={group.id} delay={i * 0.06} className="h-full">
                <div
                  style={{ backgroundColor: bg, color: fg }}
                  className="panel flex h-full flex-col p-7"
                >
                  <h3
                    className="type-note"
                    style={{ color: label, opacity: group.lead ? 0.85 : 1 }}
                  >
                    {t(`groups.${group.id}`)}
                  </h3>
                  <ul className="mt-6 flex list-none flex-col gap-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="type-display text-[1.35rem] leading-tight"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
