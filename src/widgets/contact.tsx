import { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaLinkedin, FaMailBulk, FaPhone } from 'react-icons/fa';

interface ContactSectionProps {
  contactSectionTitle: string;
  contactInformationTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  buttonLabel: string;
  successMessage: string;
}

export default function ContactSection(props: ContactSectionProps) {
  const {
    buttonLabel,
    contactInformationTitle,
    contactSectionTitle,
    emailPlaceholder,
    messageLabel,
    messagePlaceholder,
    nameLabel,
    namePlaceholder,
    successMessage
  } = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      setError('Falha ao enviar o e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex w-full items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-robotoMono mb-12">
          {contactSectionTitle}
        </h2>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6">
                {contactInformationTitle}
              </h3>
              <div className="space-y-6">
                <a
                  href="tel:+5551999065735"
                  className="flex items-center space-x-4 hover:text-purple-200 transition-colors duration-300"
                >
                  <FaPhone size={24} />
                  <span className="text-lg">+55 51 999065735</span>
                </a>
                <a
                  href="mailto:gianlucaflaydner@gmail.com"
                  className="flex items-center space-x-4 hover:text-purple-200 transition-colors duration-300"
                >
                  <FaMailBulk size={24} />
                  <span className="text-lg">gianlucaflaydner@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gianluca-laydner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:text-purple-200 transition-colors duration-300"
                >
                  <FaLinkedin size={24} />
                  <span className="text-lg">Gianluca Laydner</span>
                </a>
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <form onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={namePlaceholder}
                    required
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={emailPlaceholder}
                    required
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={messagePlaceholder}
                    required
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : buttonLabel}
                </button>
                {success && (
                  <p className="text-green-600 text-center mt-2">
                    {successMessage}
                  </p>
                )}
                {error && (
                  <p className="text-red-600 text-center mt-2">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
