import { useTranslation } from "react-i18next";

interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <footer className={`bg-gray-800 text-white py-4 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Gianluca Laydner. {t('footer_text')}
        </p>
      </div>
    </footer>
  );
}
