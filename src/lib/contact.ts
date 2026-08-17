/**
 * Deliberately NOT a `'use client'` module.
 *
 * This flag is read by the contact section, which is a server component, and
 * by the form, which is a client one. Exported from the client module it
 * crossed the boundary as a client-reference proxy — always truthy on the
 * server — so the section rendered its second column and its heading while the
 * form itself returned null, leaving a labelled void. `NEXT_PUBLIC_*` values
 * are inlined at build time on both sides, so a plain module is correct for
 * both.
 */
export const FORM_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
);
