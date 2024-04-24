import axios, { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.url) {
    try {
      const res = await axios.get(body.url);

      const dom = new JSDOM(res.data);

      const title = dom.window.document.querySelector('title')?.textContent;
      const ogImage = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const description = dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content');

      return NextResponse.json({
        ok: true,
        message: '성공',
        payload: {
          title,
          ogImage,
          description,
        },
      });
    } catch (e) {
      return NextResponse.json(
        { ok: true, message: '에러', payload: e },
        { status: HttpStatusCode.InternalServerError },
      );
    }
  }

  return NextResponse.json(
    { ok: false, message: 'required request url', payload: null },
    { status: HttpStatusCode.BadRequest },
  );
}
