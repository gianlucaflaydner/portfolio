import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  const { className } = props;
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-gray-800 hover:text-blue-600">
              {t('about')}
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-gray-800 hover:text-blue-600">
              {t('skills')}
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-gray-800 hover:text-blue-600"
            >
              {t('projects')}
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-800 hover:text-blue-600">
              {t('contact')}
            </Link>
          </li>
        </ul>
        <button
          onClick={toggleLanguage}
          className="relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{
            backgroundColor: i18n.language === 'en' ? '#4F46E5' : '#10B981',
          }}
          aria-pressed={i18n.language === 'es'}
          aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
        >
          <span className="sr-only">
            {i18n.language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
          </span>
          <span
            className={`${
              i18n.language === 'en' ? 'translate-x-1' : 'translate-x-7'
            } inline-block w-6 h-6 transform bg-white rounded-full transition-transform`}
          />
        </button>
        <span
          className={`right-[20px] absolute text-xs font-medium text-black`}
        >
          {i18n.language.toUpperCase()}
        </span>
      </nav>
    </header>
  );
}
