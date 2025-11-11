import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = ['/az', '/en'].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

function getLocale(request: NextRequest): string {
  // Check if user has a preferred language in localStorage (via cookie)
  const cookieLocale = request.cookies.get('language')?.value;
  if (cookieLocale && ['az', 'en'].includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    if (acceptLanguage.includes('az')) return 'az';
    if (acceptLanguage.includes('en')) return 'en';
  }

  // Default to English
  return 'en';
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
};