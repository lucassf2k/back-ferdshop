import type { Request, Response } from 'express';
import type { SoftDeleteUserOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/user/soft-delete-user-of-id-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class SoftDeleteUserOfIdController {
  constructor(
    private readonly softDeleteUserOfIdUseCase: SoftDeleteUserOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const output = await this.softDeleteUserOfIdUseCase.execute({
      id: userId,
    });
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
