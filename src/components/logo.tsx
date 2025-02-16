import { Oswald } from 'next/font/google';

const oswaldFont = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export default function GianlucaLogo() {
  return (
    <h1
      className={`${oswaldFont.variable} text-black font-oswald text-7xl logo`}
    >
      {`<Gianluca />`}
    </h1>
  );
}
