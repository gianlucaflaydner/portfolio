'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

const SECTIONS = ['work', 'career', 'products', 'stack'] as const;

/**
 * A floating pill, centred, over the page rather than a bar across it.
 */
export default function SiteHeader() {
  const t = useTranslations('nav');
  const tLang = useTranslations('lang');
  const tContact = useTranslations('contact');
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const otherLocale = locale === 'pt' ? 'en' : 'pt';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t('skipToContent')}
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <nav
          aria-label={t('home')}
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-panel-hi/85 p-1.5 pl-5 shadow-[0_10px_40px_-24px_rgba(22,21,15,0.45)] backdrop-blur-md"
        >
          <Link
            href="/"
            aria-label={t('home')}
            className="type-display mr-2 text-lg text-ink"
          >
            Gianluca
          </Link>

          <ul className="hidden list-none items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  className="rounded-full px-3.5 py-2 text-[0.9rem] text-ink-soft transition-colors hover:bg-panel hover:text-ink"
                >
                  {t(s)}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={tLang('switchTo')}
            className="type-note rounded-full px-3 py-2 transition-colors hover:text-ink"
          >
            {otherLocale.toUpperCase()}
          </Link>

          <a href="#contact" className="btn btn-accent hidden py-2.5 md:inline-flex">
            {tContact('title')}
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full p-2.5 text-ink-soft transition-colors hover:text-ink md:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </nav>
      </header>

      {/* MUST stay outside <header>: the nav carries backdrop-blur, and
          backdrop-filter makes an element the containing block for its
          position:fixed descendants — nested, this panel collapsed to the
          nav's own box while its links spilled over the page. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('openMenu')}
        className={cn(
          'fixed inset-0 z-[60] flex-col bg-paper md:hidden',
          open ? 'flex' : 'hidden',
        )}
      >
        <div className="flex justify-end p-5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label={t('closeMenu')}
            className="rounded-full p-2.5 text-ink-soft"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <ul className="flex list-none flex-col px-6">
          {[...SECTIONS, 'contact' as const].map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="type-display block border-b border-line py-6 text-4xl"
              >
                {s === 'contact' ? tContact('title') : t(s)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
