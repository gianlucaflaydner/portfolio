import { Oswald } from 'next/font/google';

const oswaldFont = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export default function GianlucaLogo() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 transition-screen">
      <h1
        className={`${oswaldFont.variable} font-oswald text-red-700 text-7xl`}
      >
        {`<Gianluca />`}
      </h1>
    </div>
  );
}
