/**
 * Picks readable text for an arbitrary background.
 *
 * The storefront colours come off thirteen live retail sites, so they run from
 * lime to near-black and no single foreground works across them. This computes
 * WCAG relative luminance and returns whichever of the page's two inks clears
 * the better contrast, rather than guessing light-on-dark.
 */

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

export function luminance(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const PAPER = '#fbf7ef';
const INK = '#16150f';
const AA = 4.5;

const parse = (hex: string) => {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ] as const;
};

const toHex = (rgb: readonly number[]) =>
  '#' +
  rgb
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('');

/**
 * Nudges a brand colour along its own hue until the better ink clears AA for
 * small text.
 *
 * Some real brand colours land in the dead zone where neither the paper nor
 * the ink reaches 4.5:1 — D'avó's red tops out at 4.24 against ink. Picking
 * "the better of two" there still ships failing body text, so the surface
 * moves instead of the requirement. Hue is preserved; only lightness shifts,
 * and only as far as it has to.
 */
export function brandSurface(bg: string) {
  if (Math.max(contrast(bg, PAPER), contrast(bg, INK)) >= AA) return bg;

  const rgb = parse(bg);
  // Try both directions and keep whichever needs the smaller move.
  for (let step = 1; step <= 24; step++) {
    const k = step / 24;
    const darker = toHex(rgb.map((v) => v * (1 - k * 0.8)));
    if (contrast(darker, PAPER) >= AA) return darker;
    const lighter = toHex(rgb.map((v) => v + (255 - v) * k * 0.8));
    if (contrast(lighter, INK) >= AA) return lighter;
  }
  return bg;
}

/** The ink or the paper, whichever reads better on this brand colour. */
export function readableOn(bg: string) {
  return contrast(bg, PAPER) >= contrast(bg, INK) ? PAPER : INK;
}

/** A translucent version of the foreground, for secondary lines on the card.
 *  Kept high enough that the fade does not undo the contrast check above. */
export function softOn(bg: string) {
  return readableOn(bg) === PAPER
    ? 'rgba(251,247,239,0.86)'
    : 'rgba(22,21,15,0.8)';
}

/**
 * A brand colour washed into the paper. Used for surfaces that should carry a
 * hue without competing with the type sitting on them.
 */
export function tint(hex: string, amount = 0.12) {
  const [r, g, b] = parse(hex);
  const [pr, pg, pb] = parse(PAPER);
  return toHex([
    pr + (r - pr) * amount,
    pg + (g - pg) * amount,
    pb + (b - pb) * amount,
  ]);
}

/**
 * A brand colour pushed dark enough to carry paper text at AA, whatever it
 * started as. Lime and pale blues need it; navy already passes untouched.
 */
export function deepen(hex: string) {
  const rgb = parse(hex);
  for (let step = 0; step <= 24; step++) {
    const k = step / 24;
    const candidate = toHex(rgb.map((v) => v * (1 - k * 0.85)));
    if (contrast(candidate, PAPER) >= AA) return candidate;
  }
  return INK;
}

/** Hairlines that read on the brand colour without introducing a third tone. */
export function ruleOn(bg: string) {
  return readableOn(bg) === PAPER
    ? 'rgba(251,247,239,0.28)'
    : 'rgba(22,21,15,0.22)';
}
