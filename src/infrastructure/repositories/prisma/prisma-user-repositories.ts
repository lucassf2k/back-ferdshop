import type { UserRepositories } from '../../../application/repositories/user-repositories';
import { User } from '../../../domain/user';
import { prisma } from '../../database/prisma';
import { userMapper } from './mappers/user-mapper';

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
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    if (allUsers.length === 0) return [];
    return allUsers.map(userMapper.toDomain);
  }

  async delete(id: string): Promise<User | undefined> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }

  async getOfEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return undefined;
    return userMapper.toDomain(user);
  }
}
