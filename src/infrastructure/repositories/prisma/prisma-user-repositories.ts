import type { PaginationOptions } from '../../../application/repositories/common-types';
import type {
  UserModel,
  UserRepositories,
} from '../../../application/repositories/user-repositories';
import { User } from '../../../domain/user';
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

  async getAll(option: PaginationOptions): Promise<UserModel[]> {
    const allUsers = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      skip: option.skip,
      take: option.take,
    });
    if (allUsers.length === 0) return [];
    return allUsers.map(userMapper.toUserModel);
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
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!user) return undefined;
    return userMapper.toUserModel(user);
  }
}

export const prismaUserRepositories = new PrismaUserRepositories();
