import { User } from '../../../generated/prisma/client.js';
export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(
    firstName: string,
    lastName: string |undefined,
    email: string,
    password: string,
    phoneNumber: string,
    role?: string,
  ): Promise<User | null>;
}
