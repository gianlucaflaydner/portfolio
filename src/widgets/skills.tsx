/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { SkillCard } from '@/components/skillCard';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiCss3,
  SiHtml5,
  SiOracle,
  SiGit,
  SiTailwindcss,
  SiChakraui,
} from 'react-icons/si';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SkillsProps {
  skillsTitle: string;
  skillsDescription: string;
}

export default function SkillsSection(props: SkillsProps) {
  const { skillsTitle, skillsDescription } = props;
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const skills = [
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'HTML5', icon: SiHtml5 },
    { name: 'CSS', icon: SiCss3 },
    { name: 'Git', icon: SiGit },
    { name: 'TailwindCSS', icon: SiTailwindcss },
    { name: 'Chakra UI', icon: SiChakraui },
    { name: 'OCC', icon: SiOracle },
    { name: 'OSF', icon: SiOracle },
  ];

  const containerRef = useRef(null);
  const swiperRef = useRef<SwiperCore>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && swiperRef.current) {
      swiperRef.current.autoplay.start();
    } else if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  }, [isVisible]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="text-center items-center justify-center flex flex-col w-full"
    >
      <h2 className="text-3xl font-bold font-robotoMono mb-4">
        {skillsTitle}
      </h2>
      <p className="text-balance mt-2 mb-6 max-w-2xl mx-auto text-gray-600">
        {skillsDescription}
      </p>
      <Swiper
        spaceBetween={25}
        slidesPerView={2}
        breakpoints={{
          360: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
        }}
        className="w-[80%] md:w-[60%] h-[140px] sm:px-10 md:px-16 lg:px-40"
      >
        {skills.map((skill) => (
          <SwiperSlide key={skill.name}>
            <SkillCard {...skill} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
