import { User } from '../../../generated/prisma/client.js';
import { Role } from '../../../generated/prisma/enums.js';
import { prisma } from '../../lib/prisma.js';
import { IAuthRepository } from './auth.interface.js';

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    role?: Role,
  ) {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
      },
    });

    return user;
  }
}
