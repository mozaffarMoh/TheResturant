// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const nextIntlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    // Match all paths, but exclude specific patterns
    '/((?!api|_next/static|favicon.ico|static|public))',
    '/(ar|en)/:path*',  // Match paths starting with 'ar/' or 'en/'
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const localeCookies = req.cookies.get("NEXT_LOCALE")?.value || 'en'

  // Bypass middleware for static files and assets
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/public') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/messages') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/.test(url.pathname)
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = Boolean(req.cookies.get('token'));

  if (!isAuthenticated) {
    if (
      url.pathname == `/${localeCookies}` ||
      url.pathname.includes('/home') ||
      url.pathname.includes('/contact-us') ||
      url.pathname.includes('/profile') ||
      url.pathname.includes('/change-password') ||
      url.pathname.includes('/my-activity')
    ) {
      url.pathname = `/${localeCookies}/guest-home`;
      return NextResponse.redirect(url);
    }
  } else {
    if (
      url.pathname == `/${localeCookies}` ||
      url.pathname.includes('/who-are-you') ||
      url.pathname.includes('/sign-in') ||
      url.pathname.includes('/sign-up') ||
      url.pathname.includes('/guest-home')
    ) {
      url.pathname = `/${localeCookies}/home`;
      return NextResponse.redirect(url);
    }
  }

  const response = nextIntlMiddleware(req);
  return response;
}