import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.helper.js';
import { IJwtPayload } from '../types/index.js';

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(410, 'Unauthorized request');
    }

    const decoded = verifyAccessToken(token) as IJwtPayload;

    const user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      createdAt: decoded.createdAt,
      updatedAt: decoded.updatedAt,
    };

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};
