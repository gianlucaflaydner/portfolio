'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';

import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';
import { FORM_CONFIGURED } from '@/lib/contact';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/**
 * `onField` switches the form to the palette it needs when it sits on the
 * solid contact panel rather than on paper.
 */
export default function ContactForm({ onField }: { onField?: boolean }) {
  const t = useTranslations('contact');
  const id = useId();

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const field = cn(
    'w-full rounded-xl px-4 py-3.5 outline-none transition-colors duration-300',
    onField
      ? 'bg-paper/12 text-paper placeholder:text-paper/50 focus:bg-paper/20'
      : 'border border-line bg-panel-hi text-ink placeholder:text-ink-soft focus:border-accent',
  );

  const label = cn('type-note block pb-2', onField && 'text-paper/70');

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = t('errorName');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = t('errorEmail');
    }
    if (!values.message.trim()) next.message = t('errorMessage');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          from_name: values.name,
          reply_to: values.email,
          message: values.message,
        },
        { publicKey: USER_ID! },
      );
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!FORM_CONFIGURED) return null;

  const fields = [
    {
      key: 'name' as const,
      type: 'text',
      autoComplete: 'name',
      label: t('nameLabel'),
      placeholder: t('namePlaceholder'),
    },
    {
      key: 'email' as const,
      type: 'email',
      autoComplete: 'email',
      label: t('emailLabel'),
      placeholder: t('emailPlaceholder'),
    },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {fields.map((f) => (
        <div key={f.key}>
          <label htmlFor={`${id}-${f.key}`} className={label}>
            {f.label}
          </label>
          <input
            id={`${id}-${f.key}`}
            name={f.key}
            type={f.type}
            autoComplete={f.autoComplete}
            className={field}
            placeholder={f.placeholder}
            value={values[f.key]}
            onChange={(e) =>
              setValues({ ...values, [f.key]: e.target.value })
            }
            aria-invalid={Boolean(errors[f.key])}
            aria-describedby={
              errors[f.key] ? `${id}-${f.key}-error` : undefined
            }
          />
          {errors[f.key] ? (
            <p id={`${id}-${f.key}-error`} className="pt-2 text-sm">
              {errors[f.key]}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {t('messageLabel')}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          className={cn(field, 'resize-y')}
          placeholder={t('messagePlaceholder')}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="pt-2 text-sm">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={cn(
          'btn self-start',
          onField
            ? 'bg-paper text-[#1b3ac9] hover:bg-paper'
            : 'btn-accent',
          status === 'sending' && 'opacity-60',
        )}
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>

      <p role="status" aria-live="polite" className="text-sm">
        {status === 'sent' ? t('success') : null}
        {status === 'error' ? t('errorSend', { email: SITE.email }) : null}
      </p>
    </form>
  );
}
