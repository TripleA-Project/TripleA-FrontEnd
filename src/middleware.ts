import { NextRequest, NextResponse } from 'next/server';
import { ROUTE_PATH } from './constants/routePath';
import { HttpStatusCode } from 'axios';

export async function middleware(request: NextRequest) {
  const requestOrigin = request.nextUrl.origin;
  const requestCookies = request.cookies;

  const redirectLoginURL = new URL(ROUTE_PATH.LOGIN(request.nextUrl.pathname), requestOrigin);
  const redirectHomeURL = new URL('/', requestOrigin);

  const verifiedToken = requestCookies.get('verifiedToken')?.value;
  const verifyResponse = await fetch(new URL('/api/verify', requestOrigin).toString(), {
    cache: 'no-store',
    headers: {
      Authorization: verifiedToken ? `Bearer ${verifiedToken}` : '',
      Cookie: requestCookies.toString(),
    },
  });

  const payload = await verifyResponse.json();

  if (payload.status === HttpStatusCode.Unauthorized) {
    return NextResponse.redirect(redirectLoginURL);
  }

  if (payload.status === HttpStatusCode.Forbidden) {
    return NextResponse.redirect(redirectHomeURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
