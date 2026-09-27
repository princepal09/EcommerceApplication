import { Response } from 'express';
import { ApiResponseType } from '../types/index.js';

export const sendResponse = <T>(res: Response, statusCode: number, message: string, data?: T) => {
  const response: ApiResponseType<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };

  return res.status(statusCode).json(response);
};
