'use client';

import { useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/media';

/**
 * The living grid.
 *
 * Blocks of the accent are born in a cell, travel a few cells, and dissolve.
 * The vocabulary is a product grid resolving and clearing — abstract, but made
 * of the thing the work is actually about, rather than generic ambient noise.
 *
 * Canvas rather than DOM: a few dozen animating rectangles would each be a
 * composited layer, and this stays one.
 */

/**
 * The blocks borrow the storefronts' own colours rather than repeating the
 * page accent, so the first thing on screen is already made of the work.
 */
const PALETTE = [
  '#1b4de4',
  '#eb5c2e',
  '#f2171d',
  '#005e8e',
  '#c8d400',
  '#ff6f52',
  '#004b93',
];
const CELL_REM = 8.5;

type Block = {
  col: number;
  row: number;
  w: number;
  h: number;
  /** 0..1 through its own life. */
  t: number;
  life: number;
  drift: number;
  alpha: number;
  color: string;
};

export default function GridField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cell =
      CELL_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
    };

    resize();

    const blocks: Block[] = [];

    /**
     * Blocks keep clear of the copy and of the band where the floating nav
     * pill sits; a block behind either turns readable text into something read
     * off a moving background.
     *
     * The safe area is width-dependent. On a wide screen the copy occupies the
     * left column, so blocks live to its right. On a phone the copy runs the
     * full width, leaving no right-hand column at all — there, the only clear
     * ground is below the buttons.
     */
    const narrow = width < 768;

    const inTextZone = (col: number, row: number) => {
      const x = col * cell;
      const y = row * cell;
      if (narrow) return y < height * 0.76;
      const underNav = y < height * 0.17;
      const behindCopy = x < width * 0.62 && y > height * 0.17;
      return underNav || behindCopy;
    };

    const spawn = (): Block => {
      // Collect the cells that are actually clear, then pick from those. A
      // retry loop can exhaust its attempts and fall through with a bad cell,
      // which is how blocks ended up sitting on the copy.
      const free: Array<[number, number]> = [];
      for (let c = 0; c < Math.max(cols, 1); c++) {
        for (let r = 0; r < Math.max(rows, 1); r++) {
          if (!inTextZone(c, r)) free.push([c, r]);
        }
      }
      const [col, row] = free.length
        ? free[Math.floor(Math.random() * free.length)]
        : [Math.max(cols - 1, 0), Math.max(rows - 1, 0)];

      return {
        col,
        row,
        // Whole cells only — the block belongs to the grid, it does not float.
        w: Math.random() > 0.6 ? 2 : 1,
        h: Math.random() > 0.8 ? 2 : 1,
        t: 0,
        life: 5200 + Math.random() * 4200,
        drift: Math.random() > 0.5 ? 1 : -1,
        // Solid. The reference plants one fully saturated block in a cell; a
        // field of translucent ones reads as a gradient wash, not as colour
        // snapped to the grid.
        alpha: 1,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    };

    // A phone has one clear band, so fewer blocks share it.
    const MAX = narrow ? 2 : 4;
    for (let i = 0; i < MAX; i++) {
      const b = spawn();
      b.t = Math.random();
      blocks.push(b);
    }

    let raf = 0;
    let last = performance.now();
    let running = true;
    let pointerX = 0.5;

    const onPointer = (e: PointerEvent) => {
      pointerX = e.clientX / window.innerWidth;
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (const b of blocks) {
        b.t += dt / b.life;
        if (b.t >= 1) Object.assign(b, spawn());

        // Ease in, hold, ease out — a block arrives, sits on the grid, leaves.
        const fade =
          b.t < 0.25
            ? b.t / 0.25
            : b.t > 0.72
              ? 1 - (b.t - 0.72) / 0.28
              : 1;

        // A cell of travel across its life, nudged by where the pointer is.
        const shift = (b.t - 0.5) * cell * 0.55 * b.drift;
        const parallax = (pointerX - 0.5) * cell * 0.12 * b.drift;

        ctx.globalAlpha = fade * b.alpha;
        ctx.fillStyle = b.color;
        ctx.fillRect(
          Math.round(b.col * cell + shift + parallax),
          Math.round(b.row * cell),
          b.w * cell,
          b.h * cell,
        );
      }

      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener('pointermove', onPointer, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Off-screen or backgrounded, stop burning frames.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
