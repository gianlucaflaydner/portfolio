import { getTranslations } from 'next-intl/server';

export default async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="py-10">
      <div className="mx-auto w-full max-w-[84rem] px-6 sm:px-10">
        <p className="text-sm text-ink-soft">
          {t('rights', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
