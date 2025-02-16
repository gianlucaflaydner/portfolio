import type { IconType } from 'react-icons';

interface SkillCardProps {
  name: string;
  icon: IconType;
}

export function SkillCard({ name, icon: Icon }: SkillCardProps) {
  return (
    <div className="overflow-hidden border-[#CCCCCC] border-[1px] rounded-md">
      <div className="p-3 flex flex-col items-center text-center ">
        <Icon className="w-6 h-6 mb-2 text-primary" />
        <h3 className="font-medium text-sm md:text-base mb-1">{name}</h3>
      </div>
    </div>
  );
}
