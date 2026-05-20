import type { Request, Response } from 'express';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class MeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user;
    const httpResponse = HttpResponse.ok({ user });
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
