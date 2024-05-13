import { API_ROUTE_PATH } from '@/constants/routePath';
import { SignupRequest, SignupResponse } from '@/interfaces/Dto/Auth';
import { users } from '@/mocks/db/user';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const signup = http.post<PathParams, SignupRequest, SignupResponse>(
  getURL(API_ROUTE_PATH.SIGNUP),
  async ({ request }) => {
    const { email, fullName, newsLetter, password } = await request.json();

    const latestId = Math.max(...users.map((user) => user.id));

    users.push({
      id: latestId + 1,
      email,
      fullName,
      password,
      memberRole: 'USER',
      membership: 'BASIC',
      newsLetter,
      createAt: new Date().toISOString(),
      nextPaymentDate: '',
      changeMembershipDate: null,
      freeTrial: false,
      freeTierStartDate: '',
      freeTierEndDate: '',
      memo: '',
    });

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '회원가입 성공',
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
