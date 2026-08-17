/**
 * Tools, grouped by what they are for. The previous site auto-scrolled these
 * in a Swiper carousel; a static grouped list reads faster and does not move
 * content out from under the reader.
 */

export interface StackGroup {
  /** i18n key for the group label. */
  id: 'languages' | 'commerce' | 'styling' | 'data';
  /** Borrowed from the storefront palette so the section belongs to the page. */
  accent: string;
  /** Commerce is the specialism, and it is the one group rendered solid. */
  lead?: boolean;
  items: string[];
}

/**
 * Grouped the way a developer actually describes a stack, not by invented
 * categories. The old "Platform" bucket held version control, an ORM, an API
 * layer, a test runner and a host at once, which no honest label covers.
 *
 * Git is deliberately absent: every developer uses it, so listing it on a
 * mid-level portfolio reads like listing email.
 */
export const STACK: StackGroup[] = [
  {
    id: 'languages',
    accent: '#0a50c8',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js'],
  },
  {
    // OSF *is* Oracle Storefront; listing both read as two separate tools.
    id: 'commerce',
    accent: '#1b4de4',
    lead: true,
    items: ['Oracle Commerce Cloud', 'Oracle Storefront (OSF)', 'REST APIs'],
  },
  {
    id: 'styling',
    accent: '#eb5c2e',
    items: ['Tailwind CSS', 'Chakra UI', 'CSS', '@semanticHtml'],
  },
  {
    id: 'data',
    accent: '#005e8e',
    items: ['Prisma', 'GraphQL', 'Jest', 'Vercel'],
  },
];
