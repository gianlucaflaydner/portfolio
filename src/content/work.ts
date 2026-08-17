/**
 * Employers and the storefronts built at each. Sector and country codes are
 * translation keys resolved at render; names, years and URLs are facts and
 * live here verbatim.
 */

export type CountryCode = 'BR' | 'UY' | 'CL';

export interface Storefront {
  /** Stable id, also the i18n key for the sector label. */
  id: string;
  name: string;
  country: CountryCode;
  /** Year the work shipped. */
  year: number;
  url?: string;
  /**
   * The store's own colour, measured off the live site rather than chosen —
   * the dominant saturated background in the header and nav, cross-checked
   * against a screenshot of each storefront. Thirteen real retail brands give
   * the page thirteen real colours.
   */
  brand: string;
  /** Legacy logo, kept only where one already existed. The shelf renders
   *  wordmarks; these survive for the OG image and future use. */
  logo?: string;
}

export interface Employer {
  id: string;
  name: string;
  start: number;
  /** Absent means current. */
  end?: number;
  storefronts: Storefront[];
}

export const EMPLOYERS: Employer[] = [
  {
    id: 'lighthouse',
    name: 'Lighthouse IT',
    start: 2022,
    end: 2025,
    storefronts: [
      {
        id: 'salon-line',
        brand: '#ff6f52',
        name: 'Salon Line',
        country: 'BR',
        year: 2022,
        url: 'https://www.salonline.com.br/',
        logo: '/images/salon-line.webp',
      },
      {
        id: 'zema',
        brand: '#0b315b',
        name: 'Zema',
        country: 'BR',
        year: 2023,
        url: 'https://www.zema.com/',
        logo: '/images/zema.png',
      },
      {
        id: 'entel',
        brand: '#0a50c8',
        name: 'Entel',
        country: 'CL',
        year: 2023,
        url: 'https://www.entel.cl/',
        logo: '/images/entel.png',
      },
      {
        id: 'esplanada',
        brand: '#f26522',
        name: 'Esplanada Móveis',
        country: 'BR',
        year: 2024,
        url: 'https://www.esplanadamoveis.com.br/',
        logo: '/images/esplanada.png',
      },
      {
        id: 'davo',
        brand: '#f2171d',
        name: "D'avó",
        country: 'BR',
        year: 2024,
        url: 'https://www.davo.com.br/',
        logo: '/images/davo.png',
      },
      {
        id: 'confianca',
        brand: '#004b93',
        name: 'Confiança',
        country: 'BR',
        year: 2025,
        url: 'https://www.confianca.com.br/',
        logo: '/images/confianca.svg',
      },
    ],
  },
  {
    id: 'jbq',
    name: 'JBQ Global',
    start: 2025,
    end: 2026,
    storefronts: [
      {
        id: 'iplace-br',
        brand: '#c8d400',
        name: 'iPlace BR',
        country: 'BR',
        year: 2025,
        url: 'https://www.iplace.com.br/',
      },
      {
        id: 'iplace-uy',
        brand: '#111111',
        name: 'iPlace UY',
        country: 'UY',
        year: 2025,
        url: 'https://www.iplace.com.uy/',
      },
      {
        id: 'taqi',
        brand: '#eb5c2e',
        name: 'Taqi',
        country: 'BR',
        year: 2025,
        url: 'https://www.taqi.com.br/',
      },
      {
        id: 'volis',
        brand: '#25282a',
        name: 'Volis',
        country: 'BR',
        year: 2025,
        url: 'https://www.volis.com.br/',
      },
      {
        id: 'voulevar',
        brand: '#073f6a',
        name: 'Voulevar',
        country: 'BR',
        year: 2025,
        url: 'https://www.voulevar.com.br/',
      },
    ],
  },
  {
    id: 'aggrandize',
    name: 'Aggrandize',
    start: 2026,
    storefronts: [
      {
        id: 'frigelar',
        brand: '#b31021',
        name: 'Frigelar',
        country: 'BR',
        year: 2026,
        url: 'https://www.frigelar.com.br/',
      },
      {
        id: 'eos',
        brand: '#005e8e',
        name: 'EOS',
        country: 'BR',
        year: 2026,
        url: 'https://eos.com.br/',
      },
    ],
  },
];

export const ALL_STOREFRONTS: (Storefront & { employer: Employer })[] =
  EMPLOYERS.flatMap((employer) =>
    employer.storefronts.map((s) => ({ ...s, employer })),
  );

export const COUNTRIES = [
  ...new Set(ALL_STOREFRONTS.map((s) => s.country)),
] as CountryCode[];
