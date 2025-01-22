import Image from 'next/image';
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
import { useTranslation } from 'react-i18next';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isContentAnimating, setIsContentAnimating] = useState(false);
  const { t } = useTranslation('common');

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
        <GianlucaLogo />
      ) : (
        <>
          <Header
            className={` ${isContentAnimating ? 'content-slide-down' : 'opacity-0'}`}
          />
          <div
            className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ${
              isContentAnimating ? 'content-slide-down' : 'opacity-0'
            }`}
          >
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <section id="about" className="text-center">
                <Image
                  src="/images/profile_picture.jpeg"
                  alt="Gianluca Laydner"
                  width={150}
                  height={150}
                  className="mx-auto rounded-full"
                />
                <h1 className="mt-4 text-3xl font-bold">Gianluca Laydner</h1>
                <p className="mt-2 text-xl text-gray-600">{t('profile_job')}</p>
                <p className="mt-4 max-w-2xl mx-auto">{t('profile_description')}</p>
              </section>
            </main>
          </div>
          <Footer
            className={` ${isContentAnimating ? 'content-slide-down' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
}
