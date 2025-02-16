import { useEffect, useState } from 'react';
import { Roboto_Mono } from 'next/font/google';
import GianlucaLogo from '@/components/logo';
import Header from '@/components/header';
import Footer from '@/components/footer';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import AboutSection from '@/widgets/about';
import SkillsSection from '@/widgets/skills';
import Divider from '@/components/divider';
import ProjectsSection from '@/widgets/projects';
import ContactSection from '@/widgets/contact';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 3600,
  };
}

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isContentAnimating, setIsContentAnimating] = useState(false);
  const { t } = useTranslation('common');

  const projects = [
    {
      id: 1,
      name: t('project1_title'),
      description: t('project1_description'),
      image: '/images/vista-aerea-filmes.webp',
      repo: 'https://github.com/gianlucaflaydner/vista-aerea-filmes',
      buttonText: t('projects_button_text')
    },
    {
      id: 2,
      name: t('project2_title'),
      description: t('project2_description'),
      image: '/images/movies-list-image.jpg',
      repo: 'https://github.com/gianlucaflaydner/movies-list',
      buttonText: t('projects_button_text')
    },
    {
      id: 3,
      name: t('project3_title'),
      description: t('project3_description'),
      image: '/images/bitcent.webp',
      repo: 'https://github.com/gianlucaflaydner/bitcent',
      buttonText: t('projects_button_text')
    },
    {
      id: 4,
      name: t('project4_title'),
      description: t('project4_description'),
      image: '/images/sorteador-amigo-secreto.png',
      repo: 'https://github.com/gianlucaflaydner/sorteador-amigo-secreto',
      buttonText: t('projects_button_text')
    },
    {
      id: 5,
      name: t('project5_title'),
      description: t('project5_description'),
      image: '/images/pokemon-image.jpg',
      repo: 'https://github.com/gianlucaflaydner/pokesite',
      buttonText: t('projects_button_text')
    },
    {
      id: 6,
      name: t('project6_title'),
      description: t('project6_description'),
      image: '/images/hotel-image.jpg',
      repo: 'https://github.com/gianlucaflaydner/dev-fullstack-2-hotel',
      buttonText: t('projects_button_text')
    },
  ];

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);

      const contentAnimationTimer = setTimeout(() => {
        setIsContentAnimating(true);
      }, 500);
      return () => clearTimeout(contentAnimationTimer);
    }, 2000);

    return () => clearTimeout(transitionTimer);
  }, []);

  return (
    <div className={`${robotoMono.variable} font-robotoMono`}>
      {isTransitioning ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 transition-screen">
          <GianlucaLogo />
        </div>
      ) : (
        <>
          <Header
            className={` ${isContentAnimating ? 'content-slide-down' : 'opacity-0'}`}
          />

          <main
            className={`flex bg-[#f7f4f4] flex-col h-full w-full items-center justify-center sm:items-start min-h-screen py-24 gap-16 ${
              isContentAnimating ? 'content-slide-down' : 'opacity-0'
            }`}
          >
            <AboutSection
              profileDescription={t('profile_description')}
              profileJob={t('profile_job')}
            />
            <Divider />
            <SkillsSection
              skillsDescription={t('skills_description')}
              skillsTitle={t('skills_title')}
            />
            <Divider />
            <ProjectsSection
              projects={projects}
              sectionTitle={t('projects_title')}
            />
            <Divider />
            <ContactSection
              contactInformationTitle={t('contact_information_title')}
              contactSectionTitle={t('contact_section_title')}
              nameLabel={t('contact_section_name_label')}
              namePlaceholder={t('contact_section_name_placeholder')}
              messageLabel={t('contact_section_message_label')}
              messagePlaceholder={t('contact_section_message_placeholder')}
              buttonLabel={t('contact_section_button_label')}
              emailPlaceholder={t('contact_section_email_placeholder')}
              successMessage={t('contact_section_email_success_message')}
            />
          </main>

          <Footer
            className={` ${isContentAnimating ? 'content-slide-down' : 'opacity-0'}`}
            footerText={t('footer_text')}
          />
        </>
      )}
    </div>
  );
}
