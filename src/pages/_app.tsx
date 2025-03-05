import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Gianluca's portfolio showcasing projects and skills in web development."
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="canonical" href="https://gianlucalaydner.dev" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
