import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { UserRole } from '../../../../domain/enums/user-role';
import type { MakeAdminUserOfIdProtocol } from '../../protocols/user/make-admin-user-of-id';
import type { MakeCustomerUserOfIdProtocol } from '../../protocols/user/make-customer-user-of-id';
import type { UpdateUserRoleUseCaseProtocol } from '../../protocols/user/update-user-role-use-case-protocol';

export class UpdateUserRoleUseCase
  implements UpdateUserRoleUseCaseProtocol.Interface
{
  constructor(
    private readonly makeAdminUserOfId: MakeAdminUserOfIdProtocol.Interface,
    private readonly makeCustomerUserOfId: MakeCustomerUserOfIdProtocol.Interface,
  ) {}

  async execute({
    id,
    role,
  }: UpdateUserRoleUseCaseProtocol.Input): Promise<
    Either<BaseApiError, UpdateUserRoleUseCaseProtocol.Output>
  > {
    const usecase = this.getUseCase(role);
    const output = await usecase.execute({ id });
    if (output.isLeft()) return eitherUtils.left(output.value);
    return eitherUtils.right(output.value);
  }

  private getUseCase(role: UserRole) {
    switch (role) {
      case 'ADMIN':
        return this.makeAdminUserOfId;
      case 'CUSTOMER':
        return this.makeCustomerUserOfId;
      default:
        return this.makeCustomerUserOfId;
    }
  }
}
