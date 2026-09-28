import { User } from '../../../generated/prisma/client.js';
import { UserResponseDTO } from './auth.response.js';

export const toUserResponse = (user: User): UserResponseDTO => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.firstName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const toJwtPayload = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};