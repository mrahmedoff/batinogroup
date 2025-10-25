import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Root path-a gələndə /az-a yönləndir
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/az', request.url));
  }
  
  // /en path-ına gələndə də /az-a yönləndir
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPath = pathname.replace('/en', '/az');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/en', '/en/:path*'],
};
