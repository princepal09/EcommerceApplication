import { RefreshToken, User } from '../../../generated/prisma/client.js';
import { Role } from '../../../generated/prisma/enums.js';

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: {
    firstName: string;
    lastName?: string | null;
    email: string;
    password: string;
    phoneNumber: string;
    role?: Role;
  }): Promise<User | null>;

  createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<RefreshToken>;

  findUserById(userId : string): Promise<User | null>;
}
