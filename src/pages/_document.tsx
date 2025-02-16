import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt">
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
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
