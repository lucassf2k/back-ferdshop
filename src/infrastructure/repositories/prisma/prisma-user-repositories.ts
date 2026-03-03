import type { UserRepositories } from '../../../application/repositories/user-repositories';
import { User } from '../../../domain/user';
import { Email } from '../../../domain/user/email';
import { PBKDF2Password } from '../../../domain/user/password/pbkdf2-password';
import { prisma } from '../../database/prisma';
import { ZodValidationService } from '../../services/zod-validation-service';

export class PrismaUserRepositories implements UserRepositories {
  async save(data: User): Promise<boolean> {
    const newUser = await prisma.user.create({
      data: {
        id: data._id,
        name: data.props.name,
        email: data.props.email.value,
        passwordValue: data.props.password.value,
        passwordSalt: data.props.password.salt,
        passwordAlgorithm: data.props.password.algorithm,
        role: data.props.role,
      },
    });
    if (!newUser) return false;
    return true;
  }

  async getOfId(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return undefined;
    return User.restore(user.id, {
      name: user.name,
      email: new Email(user.email, new ZodValidationService()),
      password: PBKDF2Password.restore(user.passwordValue, user.passwordSalt),
      role: User.userRoleFromStringToEnum(user.role),
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      deleteAt: user.deletedAt,
      updatedAt: user.updatedAt,
    });
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    if (allUsers.length === 0) return [];
    const users: User[] = [];
    for (const user of allUsers) {
      users.push(
        User.restore(user.id, {
          name: user.name,
          email: new Email(user.email, new ZodValidationService()),
          password: PBKDF2Password.restore(
            user.passwordValue,
            user.passwordSalt,
          ),
          role: User.userRoleFromStringToEnum(user.role),
          isDeleted: user.isDeleted,
          createdAt: user.createdAt,
          deleteAt: user.deletedAt,
          updatedAt: user.updatedAt,
        }),
      );
    }
    return users;
  }

  async delete(id: string): Promise<User | undefined> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    if (!user) return undefined;
    return User.restore(user.id, {
      name: user.name,
      email: new Email(user.email, new ZodValidationService()),
      password: PBKDF2Password.restore(user.passwordValue, user.passwordSalt),
      role: User.userRoleFromStringToEnum(user.role),
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      deleteAt: user.deletedAt,
      updatedAt: user.updatedAt,
    });
  }

  async getOfEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return undefined;
    return User.restore(user.id, {
      name: user.name,
      email: new Email(user.email, new ZodValidationService()),
      password: PBKDF2Password.restore(user.passwordValue, user.passwordSalt),
      role: User.userRoleFromStringToEnum(user.role),
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      deleteAt: user.deletedAt,
      updatedAt: user.updatedAt,
    });
  }
}
