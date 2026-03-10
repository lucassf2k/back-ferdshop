import type { UserRepositories } from '../../../application/repositories/user-repositories';
import { User } from '../../../domain/user';
import { prisma } from '../../database/prisma';
import { userMapper } from './mappers/user-mapper';

export class PrismaUserRepositories implements UserRepositories {
  async save(data: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: userMapper.toSavePrisma(data),
    });
    return userMapper.toDomain(newUser);
  }

  async getOfId(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });
    if (allUsers.length === 0) return [];
    return allUsers.map(userMapper.toDomain);
  }

  async softDelete(id: string): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userMapper.toSoftDeletePrisma(),
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }

  async undelete(id: string): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userMapper.toUndeletePrisma(),
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }

  async getOfEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }
}
