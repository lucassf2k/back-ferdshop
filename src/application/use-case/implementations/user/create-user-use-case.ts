import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  type Either,
  type EitherUtils,
} from '../../../../common/api-erros/either-error';
import { appStatusCode } from '../../../../common/app-status-code';
import type { EmailValidationProtocol } from '../../../../domain/protocols/validation-protocol';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type {
  UserModel,
  UserRepositories,
} from '../../../repositories/user-repositories';
import { HttpResponse } from '../../../response';
import type { CreateUserUseCaseProtocol } from '../../protocols/user/create-user-use-case-protocol';

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
      const httpResponse = HttpResponse.error(
        'EMAIL_ALREADY_EXISTS',
        'E-mail is already in use',
      );
      return this.eitherUtils.left(
        new BaseApiError(httpResponse, appStatusCode.emailAlreadyExists.status),
      );
    }
    const newUser = User.create({
      email: new Email(input.email, this.emailValidtionService),
      name: input.name,
      password: PBKDF2Password.create(input.password),
      role: User.userRoleFromStringToEnum(input.role),
    });
    const output = await this.userRepository.save(newUser);
    return this.eitherUtils.right(CreateUserUseCase.output(output));
  }

  static output(input: UserModel): CreateUserUseCaseProtocol.Output {
    return {
      id: input.id,
      name: input.name,
      email: input.email.value,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
}
