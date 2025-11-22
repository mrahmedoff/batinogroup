import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Eğer /admin/admin ile başlıyorsa, /admin'e yönlendir
  if (pathname.startsWith('/admin/admin')) {
    const correctedPath = pathname.replace('/admin/admin', '/admin');
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  // Eğer /az/admin ile başlıyorsa, /admin'e yönlendir
  if (pathname.startsWith('/az/admin')) {
    const correctedPath = pathname.replace('/az/admin', '/admin');
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/az/admin/:path*'
  ]
};