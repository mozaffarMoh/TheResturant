// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Add your authentication logic here

  const isAuthenticated = Boolean(req.cookies.get('techhubtoken'));
  // Check if the request is for the home page or any other non-authenticated page

  if (!isAuthenticated) {


    //prevent too many redirects
    if (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/guest-home') {
      return NextResponse.next();
    }else if(url.pathname === '/' || url.pathname === '/home' || url.pathname === '/book-facility' || url.pathname === '/book-facility/details'){
      url.pathname = '/guest-home';
      return NextResponse.redirect(url);
    }

   
  } else {
    if (
      url.pathname === '/sign-in' ||
      url.pathname === '/sign-up' ||
      url.pathname === '/guest-home' ||
      url.pathname === '/'
    ) {
      // Redirect to the login page
      url.pathname = '/home';
      return NextResponse.redirect(url);
    }
  }

  // You can add additional logic to handle other routes and authentication
  // For example, check if the user is authenticated
  // if (!isAuthenticated && url.pathname !== '/login') {
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/).*)'], // Adjust this array to match the routes you want to protect
};
