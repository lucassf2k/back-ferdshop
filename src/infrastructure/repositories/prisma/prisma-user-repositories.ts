import type { PaginationOptions } from '../../../application/repositories/common-types';
import type {
  UserModel,
  UserRepositories,
} from '../../../application/repositories/user-repositories';
import { User } from '../../../domain/user';
import type { UserRole } from '../../../prisma/enums';
import { prisma } from '../../database/prisma';
import { userMapper } from './mappers/user-mapper';

class PrismaUserRepositories implements UserRepositories {
  async save(data: User): Promise<UserModel> {
    const newUser = await prisma.user.create({
      data: userMapper.toSavePrisma(data),
    });
    return userMapper.toUserModel(newUser);
  }

  async getOfId(id: string): Promise<UserModel | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }

  async getAll(
    option: PaginationOptions,
  ): Promise<{ users: UserModel[]; total: number }> {
    const allUsersPromise = prisma.user.findMany({
      skip: option.skip,
      take: option.take,
    });
    const countOfUsersPromise = prisma.user.count();
    const [allUsers, total] = await Promise.all([
      allUsersPromise,
      countOfUsersPromise,
    ]);
    if (allUsers.length === 0) return { users: [], total: 0 };
    return {
      users: allUsers.map(userMapper.toUserModel),
      total,
    };
  }

  async updateRole(id: string, role: UserRole): Promise<UserModel | undefined> {
    const user = await prisma.user.update({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      data: {
        role: role,
      },
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }

  async softDelete(id: string): Promise<UserModel | undefined> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userMapper.toSoftDeletePrisma(),
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }

  async undelete(id: string): Promise<UserModel | undefined> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userMapper.toUndeletePrisma(),
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }

  async getOfEmail(email: string): Promise<UserModel | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }
}

export const prismaUserRepositories = new PrismaUserRepositories();
