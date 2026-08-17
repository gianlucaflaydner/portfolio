import { getTranslations } from 'next-intl/server';

import StorefrontRail from '@/components/storefront-rail';

/**
 * The heading lives inside the pinned viewport rather than above it. Pinned
 * outside, it scrolls away before the rail starts moving and the visitor
 * travels thirteen cards with nothing telling them what they are looking at.
 */
export default async function Shelf() {
  const t = await getTranslations('shelf');

  return (
    <section id="work" aria-labelledby="work-title" className="pt-24 sm:pt-32">
      <StorefrontRail title={t('title')} lede={t('lede')} />
    </section>
  );
}
