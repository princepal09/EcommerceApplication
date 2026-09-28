import { AuthService } from './auth.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse.js';
import { destroyCookies, setCookies } from '../../utils/auth.helper.js';
import ApiError from '../../utils/ApiError.js';

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

  getLoggedInUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    if (!userId) {
      throw new ApiError(404, 'UserId not found');
    }
    const result = await this.service.getCurrentUser(userId);

    sendResponse(res, 200, 'User details fetched successfully', result);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    console.log(refreshToken);
    const isLoggedOut = await this.service.logout(refreshToken);
    if (isLoggedOut) {
      destroyCookies(res);
    }

    sendResponse(res, 200, 'User Logout successfully', null);
  });

  logoutAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const isLoggedOutOfAllDevices = await this.service.logoutAllDevices(userId);

    if (isLoggedOutOfAllDevices) {
      destroyCookies(res);
    }

    sendResponse(res, 200, 'User log out of all devices', null);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }
    
    const result = await this.service.refreshToken(refreshToken);

    setCookies(res, result.accessToken, result.refreshToken)

    sendResponse(res, 200, 'Refresh Token generate successfully', result);
  });
}
