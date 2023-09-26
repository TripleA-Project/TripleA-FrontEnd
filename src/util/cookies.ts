'use server';

import { cookies } from 'next/headers';
import { ServerUserTokenCookies } from './serverCookies';
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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

  if (name === 'refreshToken') {
    cookies().set({
      name,
      value: '',
      expires: new Date(),
      domain: 'moya.ai',
      path: '/',
    });
  }
}

export async function syncCookie(email: string) {
  const existAccessToken = await getCookie('accessToken');
  const existServerUserTokenCookie = ServerUserTokenCookies.get(email);

  console.log('serverCookies: ', ServerUserTokenCookies.getAll());

  if (!existAccessToken && existServerUserTokenCookie) {
    console.log('serverCookie 설정');
    const { value, ...options } = existServerUserTokenCookie.accessToken!;

    await setCookie('accessToken', value, {
      ...options,
    });

    /*
      브라우저에 쿠키가 설정되어있을 경우
      서버환경이더라도 next/headers의 
      cookies를 이용해서 정상적으로
      header에 accessToken을 전달할 수 있으므로,
      serverUserTokenCookies에서 해당 계정의 토큰을 지운다.
      (
        serverUserTokenCookies는 서버에서 클라이언트 환경으로
        전환될 때 브라우저에 쿠키를 설정하기 위해 필요한
        쿠키 정보를 담고있는 임시 데이터
      )
    */
    ServerUserTokenCookies.delete(email);
  }
}
