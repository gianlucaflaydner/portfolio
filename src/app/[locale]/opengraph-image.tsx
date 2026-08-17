import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { ALL_STOREFRONTS, COUNTRIES } from '@/content/work';
import { SINCE_YEAR } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Gianluca Laydner';

const PAPER = '#fbf7ef';
const INK = '#16150f';
const SOFT = '#6b675c';
const LINE = '#e0d8c7';
const ACCENT = '#1b4de4';
const CELL = 105;

/**
 * Pulls the display face so the card carries the page's own voice. A failed
 * fetch must never fail the build, so it degrades to the renderer's default
 * and the composition still holds.
 */
async function loadDisplay(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Young+Serif&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then((r) => r.text());

    const url = css.match(/src:\s*url\((https:[^)]+\.(?:ttf|woff2?))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'hero' });
  const tStats = await getTranslations({
    locale: params.locale,
    namespace: 'stats',
  });

  const display = await loadDisplay();

  const notes = [
    `${ALL_STOREFRONTS.length} ${tStats('storefronts')}`,
    COUNTRIES.join(' · '),
    'ORACLE COMMERCE CLOUD · OSF',
    `${SINCE_YEAR} →`,
  ];

  // The same drawn grid the page stands on, with one cell filled.
  const lines = [];
  for (let x = CELL; x < size.width; x += CELL) {
    lines.push(
      <div
        key={`v${x}`}
        style={{
          position: 'absolute',
          left: x,
          top: 0,
          width: 1,
          height: size.height,
          backgroundColor: LINE,
        }}
      />,
    );
  }
  for (let y = CELL; y < size.height; y += CELL) {
    lines.push(
      <div
        key={`h${y}`}
        style={{
          position: 'absolute',
          left: 0,
          top: y,
          width: size.width,
          height: 1,
          backgroundColor: LINE,
        }}
      />,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          backgroundColor: PAPER,
          color: INK,
          padding: '0 72px 60px',
          fontFamily: display ? 'Young Serif' : 'serif',
        }}
      >
        {lines}
        <div
          style={{
            position: 'absolute',
            left: CELL * 8,
            top: CELL * 1,
            width: CELL * 2,
            height: CELL * 2,
            backgroundColor: ACCENT,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: CELL * 10,
            top: CELL * 3,
            width: CELL,
            height: CELL,
            backgroundColor: ACCENT,
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 74,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 860,
          }}
        >
          {t('headline')}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 44,
            paddingTop: 22,
            borderTop: `1px solid ${LINE}`,
            fontSize: 17,
            letterSpacing: 1.2,
            color: SOFT,
            textTransform: 'uppercase',
          }}
        >
          {notes.map((n) => (
            <span key={n} style={{ display: 'flex' }}>
              {n}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display
        ? [{ name: 'Young Serif', data: display, style: 'normal', weight: 400 }]
        : [],
    },
  );
}
