import { API_ROUTE_PATH } from '@/constants/routePath';
import { EmailAuthRequest, EmailAuthResponse } from '@/interfaces/Dto/Auth';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

// 단순 성공시켜서 플로우를 테스트 해보기 위함
// 실제 처럼 이메일 값에 따라 코드를 설정해서 관리, 이메일 발송하는 구현은 하지 않음
export const verifyEmailSend = http.post<PathParams, EmailAuthRequest, EmailAuthResponse>(
  getURL(API_ROUTE_PATH.VERIFY.EMAIL_SEND),
  async ({ request }) => {
    const { email } = await request.json();

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '이메일 발송 성공',
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
