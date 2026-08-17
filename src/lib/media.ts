'use client';

import { useEffect, useState } from 'react';

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/**
 * Whether motion is welcome.
 *
 * Deliberately a plain matchMedia read rather than a motion library's own
 * hook: the previous build used one that returned falsy while the media query
 * matched, which left content hidden and sections parallaxing for visitors who
 * had asked for neither. Starts false, so nothing is ever hidden or pinned
 * before we know.
 */
export function useMotionAllowed() {
  return !useMedia('(prefers-reduced-motion: reduce)');
}

/** True once the viewport is wide enough for pinned horizontal scrolling. */
export function useIsWide(minWidth = 1024) {
  return useMedia(`(min-width: ${minWidth}px)`);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
