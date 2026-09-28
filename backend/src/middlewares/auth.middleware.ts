import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.helper.js';
import { IJwtPayload } from '../types/index.js';

export const verifyUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(410, 'Unauthorized request');
    }

    const decoded = verifyAccessToken(token) as {
      user: IJwtPayload;
    };

    const user = decoded.user;

    req.user = user;

    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export const verifySeller = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.role !== 'SELLER') {
    throw new ApiError(401, 'You are not authorized.');
  }

  return next();
};

export const verifyAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.role !== 'ADMIN') {
    throw new ApiError(401, 'You are not authorized.');
  }

  next();
};
