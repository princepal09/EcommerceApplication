import { asyncHandler } from '../../utils/AsyncHandler.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ProductService } from './product.service.js';
import { Request, Response } from 'express';

export class ProductController {
  constructor(private readonly service: ProductService) {}

  createProductController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const result = await this.service.createProduct(
      req.body,
      userId,
      req.files as Express.Multer.File[],
    );

    sendResponse(res, 201, 'Product Created Successfully', result);
  });

  getProductsByCategoryController = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId as string;

    const result = await this.service.getAllProductsByCategoryId(categoryId);

    sendResponse(res, 200, 'Products Fetched Successfully', result);
  });

  getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.service.getAllProducts();
    sendResponse(res, 200, 'All Products Fetched Successfully', result);
  });

  updateProductController = asyncHandler(async (req:Request, res:Response) => {
    const productId = req.params.productId as string;
    const sellerId = req.user.id;
    const updatedProduct = await this.service.updateProduct(req.body, productId, sellerId);
    sendResponse(res, 200, 'Product Edited successfully', updatedProduct);

  })
}
