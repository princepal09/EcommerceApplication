import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError.js';

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(410, 'Unauthorized request');
    }
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};
