'use server';

import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

// interface SetCookieOption extends ResponseCookie{
//   name: string;
//   value: string;
//   maxAge?: number;
//   expires?: Date | string;
//   domain?: string;
//   path?: string;
//   httpOnly?: boolean;
// }
interface SetCookieOption extends ResponseCookie {}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export async function getCookies() {
  return cookies().getAll();
}

export async function setCookie(
  name: string,
  value: string,
  options?: Pick<SetCookieOption, 'maxAge' | 'expires' | 'domain' | 'path' | 'httpOnly'>,
) {
  cookies().set({
    name,
    value,
    ...(options?.maxAge !== undefined && { maxAge: options?.maxAge }),
    ...(options?.expires !== undefined && { expires: options?.expires }),
    ...(options?.domain !== undefined && { domain: options?.domain }),
    ...(options?.path !== undefined && { path: options?.path }),
    ...(options?.httpOnly !== undefined && { httpOnly: options?.httpOnly }),
  } as SetCookieOption);
}

export async function deleteCookie(name: string) {
  cookies().set({
    name,
    value: '',
    expires: new Date(),
    path: '/',
  } as SetCookieOption);
}
