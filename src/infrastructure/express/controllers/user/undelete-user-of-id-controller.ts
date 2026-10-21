import type { Request, Response } from 'express';
import type { UndeleteUserOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/user/undelete-user-of-id-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

export class UndeleteUserOfIdController {
  constructor(
    private readonly undeleteUserOfIdUseCase: UndeleteUserOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const output = await this.undeleteUserOfIdUseCase.execute({
      id: userId,
    });
    if (output.isLeft()) throw output.value;
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
