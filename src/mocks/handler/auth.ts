import { v4 as uuidv4 } from 'uuid';
import { type PathParams, rest } from 'msw';
import { HttpStatusCode } from 'axios';
import { getURL } from '@/util/url';
import { mockUserManage } from '../mockData/user';
import { mockSessionManage } from '../mockData/session';
import { RegisterdAppError } from '@/errors/Core';
import { handleMockError } from './handleMockError';
import { validateEmail, validateSignup } from '@/util/validate';
import {
  type SignupRequest,
  type SignupResponse,
  type LoginRequest,
  type LoginResponse,
  type EmailAuthRequest,
  type EmailAuthResponse,
  type EmailVerifyRequest,
  type EmailVerifyResponse,
} from '@/interfaces/Dto/Auth';

export const authHandler = [
  rest.post<SignupRequest, PathParams<string>, SignupResponse>(getURL('/api/join'), async (req, res, ctx) => {
    try {
      const { email, password, passwordCheck, fullName, newsLetter } = await req.json<SignupRequest>();

      // const { result, type } = validateSignup({ email, password, passwordCheck, fullName });

      // if (!result) {
      //   switch (type) {
      //     case 'InvalidEmailFormat':
      //       throw new RegisterdAppError('InvalidField', '유효하지 않은 email 형식입니다');
      //     case 'RequiredPassword':
      //       throw new RegisterdAppError('InvalidField', 'password는 필수 입력 항목입니다');
      //     case 'InvalidPasswordType':
      //     case 'passwordLength':
      //     case 'notAllowedChar':
      //       throw new RegisterdAppError('InvalidField', '올바른 형식의 비밀번호여야 합니다');
      //     case 'NotEqualPasswordCheck':
      //       throw new RegisterdAppError('InvalidField', 'password must be equals passwordCheck');
      //     case 'InvalidFullNameType':
      //       throw new RegisterdAppError('InvalidField', '유효한 fullName 타입이 아닙니다');
      //     case 'RequiredFullName':
      //       throw new RegisterdAppError('InvalidField', 'fullName은 필수 입력 항목입니다');
      //     case 'InvalidSpaceFormat':
      //       throw new RegisterdAppError('InvalidField', 'fullName은 공백문자를 포함하지 않아야 합니다');
      //     case 'NotCombinationAllEngOrAllKor':
      //       throw new RegisterdAppError(
      //         'InvalidField',
      //         'fullName은 영어로만 입력하거나 조합된 한글로만 입력해야 합니다',
      //       );
      //     default:
      //       break;
      //   }
      // }

      // mockUserManage.create({ email, password, fullName, newsLetter, emailVerified });

      return res(
        ctx.status(HttpStatusCode.Ok),
        ctx.json({
          status: HttpStatusCode.Ok,
          msg: '성공',
        }),
      );
    } catch (error) {
      return handleMockError(error, { req, res, ctx });
    }
  }),
  rest.post<EmailAuthRequest, PathParams<string>, EmailAuthResponse>(getURL('/api/email'), async (req, res, ctx) => {
    try {
      const { email } = await req.json<EmailAuthRequest>();

      if (!validateEmail(email).result) throw new RegisterdAppError('InvalidField', '유효하지 않은 email 형식입니다');

      const isSendedVerifyEmail = mockSessionManage.get(email);

      if (isSendedVerifyEmail) {
        throw new RegisterdAppError('IsSendedVerifyEmail');
      }

      const code = uuidv4();

      mockSessionManage.set(email, code);

      // 3분뒤 session에서 삭제
      new Promise((resolve) => {
        setTimeout(() => {
          mockSessionManage.delete(email);
          resolve('');
        }, 1000 * 60 * 3);
      });

      return res(ctx.status(HttpStatusCode.Ok), ctx.json({ status: HttpStatusCode.Ok, msg: '성공' }));
    } catch (error) {
      return handleMockError(error, { req, res, ctx });
    }
  }),
  rest.post<EmailVerifyRequest, PathParams<string>, EmailVerifyResponse>(
    getURL('/api/email/verify'),
    async (req, res, ctx) => {
      try {
        const { email, code } = await req.json<EmailVerifyRequest>();

        const authCode = mockSessionManage.get(email);

        if (!authCode) {
          throw new RegisterdAppError('InvalidField', '유효하지 않은 email 입니다');
        }

        if (authCode !== code) {
          throw new RegisterdAppError('InvalidField', '유효하지 않은 code 입니다.');
        }

        return res(ctx.status(HttpStatusCode.Ok), ctx.json({ status: HttpStatusCode.Ok, msg: '성공' }));
      } catch (error) {
        return handleMockError(error, { req, res, ctx });
      }
    },
  ),
  rest.post<LoginRequest, PathParams<string>, LoginResponse>(getURL('/api/login'), async (req, res, ctx) => {
    try {
      const { email, password } = await req.json<LoginRequest>();

      const user = mockUserManage.get({ email, password });

      if (!user) {
        throw new RegisterdAppError('ExistORNotFoundUser');
      }

      return res(
        ctx.set('Authorization', 'Bearer testAccessToken'),
        ctx.status(HttpStatusCode.Ok),
        ctx.json({
          status: HttpStatusCode.Ok,
          msg: '성공',
        }),
      );
    } catch (error) {
      return handleMockError(error, { req, res, ctx });
    }
  }),
];
