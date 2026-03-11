import type { Request, Response } from 'express';
import type { GetAllUserUseCaseProtocol } from '../../../../application/use-case/protocols/users/get-of-all-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class GetAllUserController {
  constructor(
    private getOfAllUserUseCase: GetAllUserUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.getOfAllUserUseCase.execute();
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
