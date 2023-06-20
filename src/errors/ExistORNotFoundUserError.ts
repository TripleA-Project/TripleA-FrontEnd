import { HttpStatusCode } from 'axios';
import { AppError } from './Core';

export const ExistORNotFoundUserError: AppError = {
  type: 'RegisteredAppError',
  subType: 'ExistORNotFoundUser',
  status: HttpStatusCode.NotFound,
  message: '등록되지 않은 아이디이거나 아이디 혹은 비밀번호를 잘못 입력했습니다',
};
