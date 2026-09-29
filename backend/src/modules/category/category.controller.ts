import { asyncHandler } from '../../utils/AsyncHandler.js';
import { Request, Response } from 'express';
import { CategoryService } from './category.service.js';
import { sendResponse } from '../../utils/sendResponse.js';

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  createController = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.createCategory(req.body);
    sendResponse(res, 201, 'Category Created Successfully', result);
  });
}
