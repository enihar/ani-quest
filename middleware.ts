import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const publicPaths = ['/', '/sign-in'];

  // Check if user data is available in cookies
  const userName = request.cookies.get('user-name');
  const jobTitle = request.cookies.get('job-title');

  if (publicPaths.includes(request.nextUrl.pathname)) {
    // If the user is signed in and trying to access the sign-in page, redirect to home (default path)
    if (request.nextUrl.pathname === '/sign-in' && userName) {
      request.nextUrl.pathname = '/information';
      return NextResponse.redirect(request.nextUrl);
    }

    return NextResponse.next();
  }

  // Redirect to sign-in page if username or job title is not present in cookies
  if (!userName || !jobTitle) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    url.search = `returnUrl=${encodeURIComponent(request.nextUrl.pathname)}${
      url.search
    }`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|public).*)'],
};
