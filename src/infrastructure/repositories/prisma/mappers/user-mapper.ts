import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type { Prisma } from '../../../../prisma/client';
import { ZodValidationService } from '../../../services/zod-validation-service';

type UserPrismaType = Prisma.UserGetPayload<object>;

function toDomain(raw: UserPrismaType): User {
  return User.restore(raw.id, {
    name: raw.name,
    email: new Email(raw.email, new ZodValidationService()),
    password: PBKDF2Password.restore(raw.passwordValue, raw.passwordSalt),
    isDeleted: raw.isDeleted,
    role: User.userRoleFromStringToEnum(raw.role),
    createdAt: raw.createdAt,
    deleteAt: raw.deletedAt,
    updatedAt: raw.updatedAt,
  });
}

export const userMapper = { toDomain } as const;
