import { AuthService } from './auth.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { Request, Response } from 'express';
import { registerUserSchema } from './auth.schema.js';
import { sendResponse } from '../../utils/sendResponse.js';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  login = asyncHandler(async (req: Request, res: Response) => {
    const data = registerUserSchema.parse(req.body);
    const result = await this.service.registerUserService(data);

    sendResponse(res, 201, 'Account Created Successfully', result);
  });
}
