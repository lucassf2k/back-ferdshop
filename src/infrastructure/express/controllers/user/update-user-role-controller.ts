import type { Request, Response } from 'express';
import type { UpdateUserRoleUseCaseProtocol } from '../../../../application/use-case/protocols/user/update-user-role-use-case-protocol';
import z from 'zod';
import { User } from '../../../../domain/user';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

const zodRequestQueryValidation = z.object({
  role: z
    .enum(['CUSTOMER', 'ADMIN'], { error: 'role should be CUSTOMER or ADMIN' })
    .transform((role) => User.userRoleFromStringToEnum(role)),
});

export class UpdateUserRoleController {
  constructor(
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { role } = zodRequestQueryValidation.parse(request.query);
    const output = await this.updateUserRoleUseCase.execute({ id, role });
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
