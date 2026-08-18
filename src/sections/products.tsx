import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';

import SectionHeading from '@/components/section-heading';
import ParallaxShot from '@/components/parallax-shot';
import { SplitReveal, Reveal } from '@/components/reveal';
import { PRODUCTS } from '@/content/products';
import { brandSurface, readableOn } from '@/lib/contrast';

/**
 * The most space on the page: two products he owns outright are the thing no
 * other mid-level candidate brings. Both repositories are private, so every
 * link opens the running product.
 */
export default async function Products() {
  const t = await getTranslations('products');

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[84rem] px-6 sm:px-10">
        <SectionHeading
          id="products"
          title={t('title')}
          lede={t('lede')}
          centered
        />

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.id}
              className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                <SplitReveal
                  as="h3"
                  className="type-display text-[clamp(2.2rem,5vw,3.8rem)]"
                >
                  {p.name}
                </SplitReveal>
                <Reveal delay={0.1}>
                  {/* Each product speaks in its own colour, the same way the
                      storefronts do. */}
                  <p
                    className="type-note mt-4"
                    style={{ color: brandSurface(p.brand) }}
                  >
                    {t(`${p.id}.tagline`)}
                  </p>
                  <p className="mt-6 max-w-[50ch] leading-relaxed text-ink-soft">
                    {t(`${p.id}.body`)}
                  </p>

                  <ul className="mt-8 flex list-none flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="type-note rounded-full border border-line px-3 py-1.5"
                      >
                        {/* Product names never translate; a leading @ marks the
                            few entries that are descriptions, not names. */}
                        {s.startsWith('@') ? t(`items.${s.slice(1)}`) : s}
                      </li>
                    ))}
                  </ul>

                  <p className="type-quiet mt-6">{p.domain}</p>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      backgroundColor: brandSurface(p.brand),
                      color: readableOn(brandSurface(p.brand)),
                    }}
                    className="btn mt-8"
                  >
                    {t('visit', { name: p.name })}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                <ParallaxShot
                  src={p.shot}
                  alt={t('screenshotAlt', { name: p.name })}
                  priority={i === 0}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
