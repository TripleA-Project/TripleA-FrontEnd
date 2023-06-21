import { HttpStatusCode } from 'axios';
import { AppError } from './Core';

export const NotFoundNewsError: AppError = {
  type: 'RegisteredAppError',
  subType: 'NotFoundNews',
  status: HttpStatusCode.NotFound,
  message: '뉴스를 찾을 수 없습니다.',
};
