import { HttpStatusCode } from 'axios';
import { AppError } from './Core';

export const NotAccessNewsError: AppError = {
  type: 'RegisteredAppError',
  subType: 'NotAccessNews',
  status: HttpStatusCode.Unauthorized,
  message: '뉴스를 볼 수 있는 권한이 없습니다.',
};
