'use server';

import { cookies } from 'next/headers';

interface SetCookieOption {
  name: string;
  value: string;
  expires?: Date | string;
  path?: string;
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export async function getCookies() {
  return cookies().getAll();
}

export async function setCookie(name: string, value: string, options?: Pick<SetCookieOption, 'expires' | 'path'>) {
  cookies().set({
    name,
    value,
    expires: options?.expires,
    path: options?.path,
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
