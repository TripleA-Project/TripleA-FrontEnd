import dayjs from 'dayjs';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type UserTokenType = 'accessToken';

interface Cookies {
  [key: string]: UserTokenCookie;
}

interface UserTokenCookie {
  accessToken?: Omit<ResponseCookie, 'name'>;
}

export class ServerUserTokenCookies {
  readonly cookies: Map<string, UserTokenCookie> = new Map<string, UserTokenCookie>();

  get(email: string) {
    this.update();

    return this.cookies.get(email);
  }

  getAll() {
    this.update();

    const cookies = {} as Cookies;

    Array.from(this.cookies.entries()).forEach(([email, cookie]) => {
      cookies[email] = { ...cookie };
    });

    return Object.keys(cookies).length ? cookies : null;
  }

  set({
    email,
    cookieName,
    cookieValue,
    cookieOptions,
  }: {
    email: string;
    cookieName: UserTokenType;
    cookieValue: string;
    cookieOptions: Omit<ResponseCookie, 'name' | 'value'>;
  }) {
    const { expires, maxAge, ...cookieOption } = cookieOptions;

    const expiresDate = expires ?? this.getExipiresDateFromMaxAge(maxAge);

    this.cookies.set(email, {
      [cookieName]: {
        value: cookieValue,
        ...cookieOption,
        ...(maxAge && { maxAge }),
        ...(expiresDate && { expires: expiresDate }),
      },
    });
  }

  delete(email: string) {
    this.cookies.delete(email);
  }

  clear() {
    this.cookies.clear();
  }

  update() {
    this.cookies.forEach((userTokenCookie, email) => {
      const currentDate = dayjs();

      const expiredAccessToken =
        userTokenCookie.accessToken && currentDate.isAfter(dayjs(userTokenCookie.accessToken.expires));

      if (expiredAccessToken) {
        this.delete(email);
      }
    });
  }

  getExipiresDateFromMaxAge(maxAge?: number) {
    if (!maxAge) return null;

    const currentDate = dayjs();

    return currentDate.add(maxAge, 'seconds').toDate();
  }
}
