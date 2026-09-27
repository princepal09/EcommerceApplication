import { Response } from 'express';
import { ApiResponseType } from '../types/index.js';

export const ApiResponse = <T>(res: Response, statusCode: number, payload: ApiResponseType<T>) => {
  return res.status(statusCode).json(payload);
};
