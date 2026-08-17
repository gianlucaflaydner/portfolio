/**
 * Single source of truth for site-wide facts. Metadata, footer, JSON-LD and
 * the sitemap all read from here — the same pattern futeboldle uses.
 */
export const SITE = {
  name: 'Gianluca Laydner',
  url: 'https://gianlucalaydner.dev',
  email: 'gianlucaflaydner@gmail.com',
  phone: '+55 51 99906-5735',
  phoneHref: 'tel:+5551999065735',
  github: 'https://github.com/gianlucaflaydner',
  linkedin: 'https://www.linkedin.com/in/gianluca-laydner',
  whatsapp: 'https://wa.me/5551999065735',
  cv: {
    pt: '/Gianluca-pt-cv.pdf',
    en: '/Gianluca-en-cv.pdf',
  },
} as const;

/** Counted from the content files rather than typed by hand, so the stats bar
 *  can never drift from the shelf. */
export const SINCE_YEAR = 2022;
