import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const isStaff = request.cookies.get('is_staff')?.value === 'true';
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard
  if (pathname.startsWith('/admin') && (!token || !isStaff)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect staff visiting regular dashboard to admin dashboard automatically
  if (pathname === '/dashboard' && token && isStaff) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Protect regular user routes
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/deposit')) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/deposit/:path*', '/admin/:path*', '/login', '/register'],
};