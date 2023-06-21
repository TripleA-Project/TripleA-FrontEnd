import { HttpStatusCode } from 'axios';
import { type ResponseComposition, type RestContext, type RestRequest } from 'msw';
import { type AppError, RegisterdAppError } from '@/errors/Core';
import { type APIResponse } from '@/interfaces/Dto/Core';

interface MSWHandleObject {
  req: RestRequest;
  res: ResponseComposition;
  ctx: RestContext;
}

export function handleMockError(error: unknown, { res, ctx }: MSWHandleObject) {
  if (error instanceof RegisterdAppError) {
    const { status, message, payload } = error.cause as AppError;

    return res(
      ctx.status(status),
      ctx.json<APIResponse>({
        status,
        msg: message,
        ...(payload && { data: payload }),
      }),
    );
  }

  return res(
    ctx.status(HttpStatusCode.InternalServerError),
    ctx.json<APIResponse>({
      status: HttpStatusCode.InternalServerError,
      msg: '알 수 없는 에러가 발생했습니다',
    }),
  );
}
