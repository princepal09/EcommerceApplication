import { RefreshToken, User } from '../../../generated/prisma/client.js';
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
  async createUser(data: {
    firstName: string;
    lastName?: string | null;
    email: string;
    password: string;
    phoneNumber: string;
    role?: Role;
  }) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<RefreshToken> {
    const token = await prisma.refreshToken.create({
      data,
    });

    return token;
  }

  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findRefreshToken(hashedRefreshToken: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token: hashedRefreshToken,
      },
    });

    console.log("refreshToken", refreshToken)

    return refreshToken;
  }

  async deleteRefreshTokenById(refreshTokenId: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }

  async deleteAllRefreshTokenByUserId(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
