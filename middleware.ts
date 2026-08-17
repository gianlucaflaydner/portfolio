import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import { routing } from './src/i18n/routing';

const intl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = routing.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (!hasLocale) {
    const accept = request.headers.get('accept-language');

    /**
     * next-intl falls back to `defaultLocale` for any language it cannot
     * match, which handed a Spanish or German visitor a Portuguese page while
     * the `x-default` hreflang promised them English. The audience is half
     * international, so anything that is not Portuguese gets English.
     *
     * Only when the header is actually present: a crawler that sends none must
     * still reach `/` and index it as the Portuguese canonical.
     */
    if (accept && !/\bpt\b/i.test(accept)) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intl(request);
}

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
