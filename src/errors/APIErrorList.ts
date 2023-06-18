import { ExistORNotFoundUserError } from './ExistORNotFoundUserError';
import { InvalidFieldError } from './InvalidEmailAuthRequestError';
import { IsSendedVerifyEmailError } from './IsSendedVerifyEmail';

export type AppErrorKey = keyof typeof APP_ERROR_LIST;

export const APP_ERROR_LIST = {
  ExistORNotFoundUser: ExistORNotFoundUserError,
  InvalidField: InvalidFieldError,
  IsSendedVerifyEmail: IsSendedVerifyEmailError,
};
