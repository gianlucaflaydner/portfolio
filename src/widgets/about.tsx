import useTranslation from '@/hooks/useTranslation';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';


interface AboutProps {
  profileJob: string;
  profileDescription: string;
}

export default function AboutSection(props: AboutProps) {
  const { profileJob, profileDescription } = props;
  const {  locale } = useTranslation(); 


  const cvFile =
    locale === 'pt' ? '/Gianluca-pt-cv.pdf' : '/Gianluca-en-cv.pdf';

  return (
    <section
      id="about"
      className="text-center w-full flex flex-col items-center justify-center"
    >
      <Image
        src="/images/profile_picture.jpeg"
        alt="Gianluca Laydner"
        width={150}
        height={150}
        className="mx-auto rounded-full"
      />
      <h1 className="mt-4 text-3xl font-bold">Gianluca Laydner</h1>
      <p className="mt-2 text-xl text-gray-600">{profileJob}</p>
      <p className="mt-4 max-w-2xl mx-auto">{profileDescription}</p>

      <a
        href={cvFile}
        download={`Gianluca_Laydner_CV_${locale}.pdf`}
        className="mt-8 py-3 inline-flex items-center gap-2 px-4 text-md font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        <FaDownload size={18} />
        {locale === 'pt' ? 'Baixar CV' : 'Download CV'}
      </a>
    </section>
  );
}
