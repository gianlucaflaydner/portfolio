import { getTranslations } from 'next-intl/server';
import { Mail, Phone } from 'lucide-react';

import { SplitReveal, Reveal } from '@/components/reveal';
import ContactForm from '@/components/contact-form';
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from '@/components/brand-icons';
import { FORM_CONFIGURED } from '@/lib/contact';
import { SITE } from '@/lib/site';

/**
 * The page's close, and the only full-colour surface on it. Everything above
 * sits on paper; the last thing a recruiter scrolls into is a solid field with
 * the ways to reach him on it.
 */
const FIELD = '#1b3ac9';

export default async function Contact() {
  const t = await getTranslations('contact');

  const links = [
    {
      href: `mailto:${SITE.email}`,
      label: t('emailLinkLabel'),
      value: SITE.email,
      Icon: Mail,
    },
    {
      href: SITE.whatsapp,
      label: t('whatsappLabel'),
      value: SITE.phone,
      Icon: WhatsAppIcon,
    },
    {
      href: SITE.phoneHref,
      label: t('phoneLabel'),
      value: SITE.phone,
      Icon: Phone,
    },
    {
      href: SITE.linkedin,
      label: t('linkedinLabel'),
      value: 'gianluca-laydner',
      Icon: LinkedInIcon,
    },
    {
      href: SITE.github,
      label: t('githubLabel'),
      value: 'gianlucaflaydner',
      Icon: GitHubIcon,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-4 pb-6 pt-16 sm:px-6 sm:pb-8 sm:pt-24"
    >
      <div
        style={{ backgroundColor: FIELD, color: 'var(--color-paper)' }}
        className="mx-auto w-full max-w-[92rem] rounded-[2rem] px-6 py-20 sm:px-12 sm:py-28"
      >
        <div className="mx-auto w-full max-w-[78rem]">
          <SplitReveal
            as="h2"
            className="type-display max-w-[15ch] text-[clamp(2.4rem,5.4vw,4.5rem)]"
          >
            {t('title')}
          </SplitReveal>
          <span id="contact-title" className="sr-only" />

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper/75">
              {t('lede')}
            </p>
          </Reveal>

          {/* Without the form there is only one column, and letting it run the
              full panel width strands each label a metre from its value. */}
          <div
            className={
              FORM_CONFIGURED
                ? 'mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20'
                : 'mt-16 max-w-2xl'
            }
          >
            <Reveal delay={0.15}>
              <ul className="flex list-none flex-col gap-3">
                {links.map(({ href, label, value, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      className="group flex items-center gap-4 rounded-2xl bg-paper/10 px-5 py-4 transition-colors duration-300 hover:bg-paper/20"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/15">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="type-note text-paper/70">{label}</span>
                      <span className="ml-auto truncate text-[0.98rem]">
                        {value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            {FORM_CONFIGURED ? (
              <Reveal delay={0.2}>
                <div className="rounded-[1.5rem] bg-paper/10 p-7 sm:p-9">
                  <ContactForm onField />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
