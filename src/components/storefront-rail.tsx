'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SplitReveal, Reveal } from '@/components/reveal';
import { cn } from '@/lib/cn';
import { brandSurface, readableOn, softOn, ruleOn } from '@/lib/contrast';
import { useIsWide, useMotionAllowed } from '@/lib/media';
import { ALL_STOREFRONTS } from '@/content/work';

const GUTTER = 'max(1.5rem,calc((100vw - 84rem)/2 + 2.5rem))';

/**
 * Thirteen storefronts on one rail.
 *
 * Wide screens pin the section and scrub the rail sideways — the page's one
 * big move. Everything else, narrow screens and reduced motion alike, gets an
 * ordinary vertical grid rather than a broken horizontal one. The markup is
 * the same `<ul>` in DOM order either way, so keyboard and screen-reader
 * traversal is identical; a card that takes focus off-screen scrubs the
 * timeline until it is visible.
 */
export default function StorefrontRail({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  const t = useTranslations('shelf');
  const tSector = useTranslations('sectors');

  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const motionAllowed = useMotionAllowed();
  const wide = useIsWide();
  const horizontal = motionAllowed && wide;

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail || !horizontal) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(rail.scrollWidth - window.innerWidth + 64, 1);

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const st = tween.scrollTrigger;
      const onFocusIn = (e: FocusEvent) => {
        const card = (e.target as HTMLElement)?.closest('li');
        if (!card || !st) return;
        const index = [...rail.children].indexOf(card);
        if (index < 0) return;
        const progress = index / Math.max(rail.children.length - 1, 1);
        window.scrollTo({
          top: st.start + (st.end - st.start) * progress,
          behavior: 'auto',
        });
      };
      rail.addEventListener('focusin', onFocusIn);
      return () => rail.removeEventListener('focusin', onFocusIn);
    }, section);

    return () => ctx.revert();
  }, [horizontal]);

  const heading = (
    <div
      className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4"
      style={{ paddingInline: horizontal ? GUTTER : undefined }}
    >
      <div>
        <SplitReveal
          as="h2"
          className="type-display max-w-[16ch] text-[clamp(2.1rem,4.6vw,3.6rem)]"
        >
          {title}
        </SplitReveal>
        <span id="work-title" className="sr-only" />
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-[38ch] leading-relaxed text-ink-soft">{lede}</p>
      </Reveal>
    </div>
  );

  return (
    <div ref={sectionRef} className={horizontal ? 'h-svh overflow-hidden' : ''}>
      {/* justify-between, not justify-center: the pinned viewport is held for
          several screens of scrolling, so it has to be full. Centred, it left
          a band of empty paper above and below the cards that the visitor sat
          staring at the whole way through. */}
      <div
        className={
          horizontal
            ? 'flex h-full flex-col justify-between pb-8 pt-24'
            : 'mx-auto w-full max-w-[84rem] px-6 sm:px-10'
        }
      >
        {horizontal ? (
          heading
        ) : (
          <div className="mb-14">{heading}</div>
        )}

        <div
          className={
            horizontal
              ? 'flex min-h-0 flex-1 flex-col justify-center pt-10'
              : ''
          }
        >
          <ul
            ref={railRef}
            className={
              horizontal
                ? // Cards sit at a readable height and the rail centres in the
                  // space left over. Stretching them to fill the pinned
                  // viewport only moved the empty band inside the cards.
                  'flex list-none items-stretch gap-5'
                : 'grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3'
            }
            style={
              horizontal
                ? { paddingLeft: GUTTER, paddingRight: '4rem' }
                : undefined
            }
          >
            {ALL_STOREFRONTS.map((s) => {
              const domain = s.url
                ? s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
                : null;

              // The card wears the store's own colour, nudged only if that
              // exact value cannot carry readable small text; the ink is
              // whichever of the page's two reads better on the result.
              const surface = brandSurface(s.brand);
              const fg = readableOn(surface);
              const soft = softOn(surface);
              const rule = ruleOn(surface);

              const inner = (
                <>
                  <p className="type-note" style={{ color: soft }}>
                    {s.country} · {s.year}
                  </p>
                  <h3
                    className="type-display mt-5 text-[2.1rem] leading-[1.05]"
                    style={{ color: fg }}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[0.95rem]" style={{ color: soft }}>
                    {tSector(s.id)}
                  </p>
                  <div className="mt-auto flex flex-col gap-1.5 pt-8">
                    {domain ? (
                      <p
                        className="type-quiet truncate"
                        style={{ color: soft }}
                      >
                        {domain}
                      </p>
                    ) : null}
                    <p
                      className="type-note pt-3"
                      style={{ color: soft, borderTop: `1px solid ${rule}` }}
                    >
                      {s.employer.name}
                    </p>
                  </div>
                </>
              );

              return (
                <li
                  key={s.id}
                  className={horizontal ? 'w-[21rem] shrink-0' : undefined}
                >
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={t('visit', { name: s.name })}
                      // The tall minimum belongs to the rail, where every card
                      // shares one height. Applied to the stacked layout it
                      // just hollows out each card on a phone.
                      style={{ backgroundColor: surface }}
                      className={cn(
                        'panel group relative flex h-full flex-col p-7 transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-2 focus-visible:-translate-y-2',
                        horizontal && 'min-h-[22rem]',
                      )}
                    >
                      {inner}
                      <ArrowUpRight
                        aria-hidden="true"
                        style={{ color: soft }}
                        className="absolute right-5 top-5 h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ) : (
                    <div
                      style={{ backgroundColor: surface }}
                      className={cn(
                        'panel flex h-full flex-col p-7',
                        horizontal && 'min-h-[22rem]',
                      )}
                    >
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {horizontal ? (
            <div
              aria-hidden="true"
              className="mt-10 h-px bg-line"
              style={{ marginInline: GUTTER }}
            >
              <div
                ref={barRef}
                className="h-px origin-left bg-accent"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
