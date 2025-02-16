import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50 ${className}`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
        <ul className="hidden md:flex space-x-6">
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

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <span className="text-sm font-medium text-gray-700">EN</span>
            <button
              onClick={toggleLanguage}
              className="relative mx-2 inline-flex items-center h-8 w-16 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{
                backgroundColor:
                  currentLanguage === 'pt' ? '#4F46E5' : '#10B981',
              }}
              aria-pressed={currentLanguage === 'pt'}
              aria-label={`Switch to ${currentLanguage === 'pt' ? 'English' : 'Portuguese'}`}
            >
              <span className="sr-only">
                {currentLanguage === 'pt'
                  ? 'Switch to English'
                  : 'Switch to Portuguese'}
              </span>
              <span
                className={`${
                  currentLanguage === 'pt' ? 'translate-x-8' : 'translate-x-1'
                } inline-block w-6 h-6 transform bg-white rounded-full transition-transform`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">PT</span>
          </div>
        </div>
      </nav>
    </header>
  );
}