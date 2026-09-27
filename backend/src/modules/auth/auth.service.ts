import ApiError from '../../utils/ApiError.js';
import { hashPassword } from '../../utils/auth.helper.js';
import { IAuthRepository } from './auth.interface.js';
import { registerUserDTO } from './auth.schema.js';

export class AuthService {
  constructor(private readonly repo: IAuthRepository) {}

  async registerUserService(data: registerUserDTO) {
    const { firstName, lastName, email, password, phoneNumber } = data;

    const existingUser = await this.repo.findUserByEmail(email);

    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.repo.createUser(firstName, lastName, email, hashedPassword, phoneNumber);
  }
}
