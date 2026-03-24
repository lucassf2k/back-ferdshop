import type { UserModel } from '../../../../application/repositories/user-repositories';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type { Prisma } from '../../../../prisma/client';
import { ZodValidationService } from '../../../services/zod-validation-service';

type SaveUserPrismaOutput = Prisma.UserGetPayload<object>;
type SaveUserPrismaInput = Prisma.UserCreateInput;
type UpdateUserPrismaInput = Prisma.UserUpdateInput;

function toUserModel(raw: SaveUserPrismaOutput): UserModel {
  return {
    id: raw.id,
    name: raw.name,
    email: new Email(raw.email, new ZodValidationService()),
    password: PBKDF2Password.restore(raw.passwordValue, raw.passwordSalt),
    role: User.userRoleFromStringToEnum(raw.role),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function toSavePrisma(user: User): SaveUserPrismaInput {
  return {
    id: user._id,
    name: user.props.name,
    email: user.props.email.value,
    passwordValue: user.props.password.value,
    passwordSalt: user.props.password.salt,
    passwordAlgorithm: user.props.password.algorithm,
    role: user.props.role,
  };
}

function toSoftDeletePrisma(): UpdateUserPrismaInput {
  return {
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };
}

function toUndeletePrisma(): UpdateUserPrismaInput {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}

export const userMapper = {
  toUserModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
