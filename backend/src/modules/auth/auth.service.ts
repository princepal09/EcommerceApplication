import ApiError from '../../utils/ApiError.js';
import { comparePassword, hashPassword, hashRefreshToken } from '../../utils/auth.helper.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.helper.js';
import { IAuthRepository } from './auth.interface.js';
import { toJwtPayload, toUserResponse } from './auth.mapper.js';
import { loginUserDTO, logoutUserDTO, registerUserDTO } from './auth.schema.js';

export class AuthService {
  constructor(private readonly repo: IAuthRepository) {}

  async registerUserService(data: registerUserDTO) {
    const { firstName, lastName, email, password, phoneNumber, role } = data;

    const existingUser = await this.repo.findUserByEmail(email);

    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.repo.createUser({
      firstName,
      lastName: lastName ?? null,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role ?? 'USER',
    });

    if (!newUser) {
      throw new ApiError(500, 'Failed to create user');
    }

    const jwtPayload = toJwtPayload(newUser);

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await this.repo.createRefreshToken({
      token: hashedRefreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }

  async loginUserService(data: loginUserDTO) {
    const { email, password } = data;

    const existingUser = await this.repo.findUserByEmail(email);
    if (!existingUser) {
      throw new ApiError(404, 'User not found, Please signup first');
    }

    const isPwdValid = await comparePassword(password, existingUser.password);
    if (!isPwdValid) {
      throw new ApiError(404, 'Invalid Email or password');
    }

    const jwtPayload = toJwtPayload(existingUser);
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await this.repo.createRefreshToken({
      token: hashedRefreshToken,
      userId: existingUser.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return {
      user: toUserResponse(existingUser),
      accessToken,
      refreshToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.repo.findUserById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return toUserResponse(user);
  }

  async logout(refreshToken: string) {
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    const exisitingRefreshToken = await this.repo.findRefreshToken(hashedRefreshToken);

    if (!exisitingRefreshToken) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    await this.repo.deleteRefreshTokenById(exisitingRefreshToken.id);

    return true;
  }

  async logoutAllDevices(userId: string) {
    await this.repo.deleteAllRefreshTokenByUserId(userId);
    return true;
  }
}
