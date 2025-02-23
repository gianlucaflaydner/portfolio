import { TimelineItem } from "@/types/career";


interface CareerTimelineProps {
  timelineItems: TimelineItem[];
}

export default function CareerTimeline(props: CareerTimelineProps) {
  const { timelineItems } = props;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div className="absolute left-[5px] md:left-auto md:inset-x-0 w-[2px] md:w-full h-full md:h-[2px] bg-[#1e1e1f15] md:top-4" />

        {timelineItems.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-0 md:w-48">
            <div className="absolute left-0 md:left-1/2 top-[6px] md:top-3 w-3 h-3 bg-black rounded-full -translate-x-[5px] md:-translate-x-[6px]" />

            <div className="md:text-center md:pt-8">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-black">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
