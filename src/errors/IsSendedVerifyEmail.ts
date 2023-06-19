import { HttpStatusCode } from 'axios';
import { AppError } from './Core';

export const IsSendedVerifyEmailError: AppError = {
  type: 'RegisteredAppError',
  subType: 'IsSendedVerifyEmail',
  status: HttpStatusCode.BadRequest,
  message: '인증메일이 발송된 이메일입니다',
};
