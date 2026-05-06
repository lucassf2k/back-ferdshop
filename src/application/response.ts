import type { appStatusCode } from '../common/app-status-code';

export type AppErrorCode =
  (typeof appStatusCode)[keyof typeof appStatusCode]['code'];

export type HttpSuccess<T> = {
  ok: true;
  data: T;
};

export type HttpError<C extends AppErrorCode = AppErrorCode> = {
  ok: false;
  error: {
    code: C;
    message: string;
  };
};

export const HttpResponse = {
  ok: <T>(data: T): HttpSuccess<T> => ({ ok: true, data }),
  error: <C extends AppErrorCode>(code: C, message: string): HttpError<C> => ({
    ok: false,
    error: { code, message },
  }),
};
