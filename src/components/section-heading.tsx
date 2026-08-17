import { SplitReveal, Reveal } from '@/components/reveal';

/**
 * Headings carry their own weight — no eyebrow, no section number. Mono is
 * reserved for the grid annotations, never for a label sitting above a title.
 */
import { cn } from '@/lib/cn';

export default function SectionHeading({
  id,
  title,
  lede,
  centered,
  className,
}: {
  id: string;
  title: string;
  lede?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered && 'flex flex-col items-center', className)}>
      <SplitReveal
        as="h2"
        className={cn(
          'type-display max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.6rem)]',
          centered && 'text-center',
        )}
      >
        {title}
      </SplitReveal>
      {lede ? (
        <Reveal delay={0.1} className={centered ? 'w-full' : undefined}>
          <p
            className={cn(
              'mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft',
              centered && 'mx-auto text-center',
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
      <span id={`${id}-title`} className="sr-only" />
    </div>
  );
}
