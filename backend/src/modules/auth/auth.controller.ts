import { AuthService } from './auth.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse.js';
import { setCookies } from '../../utils/auth.helper.js';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.registerUserService(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

    sendResponse(res, 201, 'Account Created Successfully', result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.loginUserService(req.body);
    setCookies(res, result.accessToken, result.refreshToken);

    sendResponse(res, 200, 'User Logged in successfully', result);
  });

}
