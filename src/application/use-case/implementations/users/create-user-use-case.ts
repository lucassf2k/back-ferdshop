import { BadRequestApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  type Either,
  type EitherUtils,
} from '../../../../common/api-erros/either-error';
import type { EmailValidationProtocol } from '../../../../domain/protocols/validation-protocol';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { CreateUserUseCaseProtocol } from '../../protocols/users/create-user-use-case-protocol';

export class CreateUserUseCase implements CreateUserUseCaseProtocol.Interface {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly emailValidtionService: EmailValidationProtocol,
    private readonly eitherUtils: EitherUtils,
  ) {}

  async execute(
    input: CreateUserUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, CreateUserUseCaseProtocol.Output>> {
    const userAlreadyExists = await this.userRepository.getOfEmail(input.email);
    if (userAlreadyExists) {
      return this.eitherUtils.left(
        new BadRequestApiError('user already exists'),
      );
    }
    const newUser = User.create({
      email: new Email(input.email, this.emailValidtionService),
      name: input.name,
      password: PBKDF2Password.create(input.password),
      role: User.userRoleFromStringToEnum(input.role),
      isDeleted: false,
    });
    const output = await this.userRepository.save(newUser);
    return this.eitherUtils.right(output);
  }
}
