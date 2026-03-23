import type { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import type { GetAllUsersUseCaseProtocol } from '../../../../application/use-case/protocols/users/get-all-users-use-case-protocol';

export class GetAllUsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.getAllUsersUseCase.execute();
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
