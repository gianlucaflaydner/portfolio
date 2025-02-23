import CareerTimeline from '@/components/timeline';
import { TimelineItem } from '@/types/career';

interface TimeLineSectionProps {
  careerSectionTitle: string;
  timelineItems: TimelineItem[];
}

export default function TimelineSection(props: TimeLineSectionProps) {
  const { timelineItems, careerSectionTitle} = props;

  return (
    <section className="container mx-auto px-4 py-4" id="career">
      <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
        {careerSectionTitle}
      </h2>
      <CareerTimeline timelineItems={timelineItems} />
    </section>
  );
}
