
interface FooterProps {
  className: string;
  footerText: string
}

export default function Footer(props: FooterProps) {
  const { className, footerText } = props;

  return (
    <footer className={`bg-gray-800 text-white py-4 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Gianluca Laydner. {footerText}
        </p>
      </div>
    </footer>
  );
}
