import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Gianluca',
              url: 'https://gianlucalaydner.dev',
              sameAs: [
                'https://github.com/gianlucaflaydner',
                'https://www.linkedin.com/in/gianluca-laydner/',
              ],
            }),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
