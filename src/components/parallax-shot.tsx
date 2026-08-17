'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '@/lib/media';

/**
 * A product shot that drifts inside its own frame as the page passes it. The
 * image is oversized and the frame clips it, so the parallax never opens a gap
 * at either edge.
 */
export default function ParallaxShot({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frame.current || !inner.current || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: frame.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={frame}
      className="panel relative aspect-[16/11] overflow-hidden bg-panel-hi"
    >
      <div ref={inner} className="absolute inset-x-0 -inset-y-[9%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 46rem, 100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
