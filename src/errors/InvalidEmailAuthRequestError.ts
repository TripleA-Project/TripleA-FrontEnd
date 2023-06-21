import { HttpStatusCode } from 'axios';
import { AppError } from './Core';

export const InvalidFieldError: AppError = {
  type: 'RegisteredAppError',
  subType: 'InvalidField',
  status: HttpStatusCode.BadRequest,
  message: 'BadRequest',
};
