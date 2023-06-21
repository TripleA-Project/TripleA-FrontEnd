import { HttpStatusCode } from 'axios';
import { APP_ERROR_LIST, AppErrorKey } from './APIErrorList';

export interface AppError {
  type: 'RegisteredAppError';
  subType: AppErrorKey;
  status: HttpStatusCode;
  message: string;
  payload?: any;
}

export class RegisterdAppError extends Error {
  constructor(subType: AppErrorKey, payload?: any) {
    const { type, status, message } = APP_ERROR_LIST[subType];

    super(message);

    this.cause = {
      type,
      subType,
      status,
      message,
      payload,
    } as AppError;
  }
}
