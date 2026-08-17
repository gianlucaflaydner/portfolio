'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

import { prefersReducedMotion } from '@/lib/media';

/**
 * Scroll entrances.
 *
 * Content renders visible and is only hidden once the effect has run and
 * confirmed motion is welcome — the inverse order leaves a blank section
 * whenever the animation path fails, which is exactly what happened in the
 * previous build.
 */

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Word-by-word mask reveal for display headings. SplitType rewrites the DOM,
 * so the original text is restored on cleanup and screen readers keep reading
 * one continuous string either way.
 */
export function SplitReveal({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(el as HTMLElement, {
      types: 'lines,words',
      lineClass: 'overflow-hidden',
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.words,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1,
          delay,
          ease: 'power4.out',
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
