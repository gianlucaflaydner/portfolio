'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '@/lib/media';

const HEADER_CLEARANCE = 96;

/**
 * The single place Lenis, GSAP and the reduced-motion gate meet.
 *
 * ScrollTrigger has to be told where the scroll position really is, because
 * Lenis owns it — without the scrollerProxy the two disagree by a frame and
 * every pinned section jitters. Anchor clicks are routed through Lenis for the
 * same reason: the browser's native hash jump fights it and overshoots.
 */
export default function MotionProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = prefersReducedMotion();

    // Everything below is motion. A visitor who asked for less gets native
    // scrolling and no triggers at all, not a slower version of the same page.
    if (reduced) {
      document.documentElement.dataset.motion = 'off';
      return;
    }
    document.documentElement.dataset.motion = 'on';

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // No scrollerProxy here on purpose. Lenis drives the real window scroll,
    // so ScrollTrigger already reads the right position from the ticker hook
    // above; registering a proxy for document.body made ScrollTrigger and
    // Lenis each think they owned the scroll and fight over it.

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -HEADER_CLEARANCE });
      history.pushState(null, '', hash);
      // Scrolling is not focusing: a keyboard visitor must land in the section
      // they asked for, not back at the top of the tab order.
      (target as HTMLElement).setAttribute('tabindex', '-1');
      (target as HTMLElement).focus({ preventScroll: true });
    };

    // Lenis overwrites the browser's own scroll-into-view for a newly focused
    // control, which otherwise leaves tab stops sitting under the header.
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.getBoundingClientRect) return;
      if (el.closest('[data-no-focus-scroll]')) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < HEADER_CLEARANCE || rect.bottom > window.innerHeight) {
        lenis.scrollTo(el, { offset: -HEADER_CLEARANCE, immediate: true });
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onFocusIn);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onFocusIn);
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return null;
}
