// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the request is for the home page or any other non-authenticated page
  if (url.pathname === '/') {
    // Redirect to the login page
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
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
  matcher: ['/', '/home'], // Adjust this array to match the routes you want to protect
};
