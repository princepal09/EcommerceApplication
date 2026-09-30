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

  deleteController = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId as string;
    await this.service.deleteCategory(categoryId);

    sendResponse(res, 204, 'Category Deleted successfully', null);
  });

  getAllCategoriesController = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await this.service.getAllCategories();

    sendResponse(res, 200, 'All Categories Fetched  successfully', categories);
  });
}
