import { User } from "../../../generated/prisma/client.js";
import { Role } from "../../../generated/prisma/enums.js";

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
}
