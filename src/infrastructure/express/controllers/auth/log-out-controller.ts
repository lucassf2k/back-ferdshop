import type { Request, Response } from 'express';
import { TOKEN_KEY } from '../../../../common/constants';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class LogOutController {
  async handle(request: Request, response: Response): Promise<Response> {
    response.clearCookie(TOKEN_KEY, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    const httpResponse = HttpResponse.ok({
      code: 'LOG_OUT_SUCCESS',
    });
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
