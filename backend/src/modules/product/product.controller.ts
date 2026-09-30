import { asyncHandler } from '../../utils/AsyncHandler.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ProductService } from './product.service.js';
import { Request, Response } from 'express';

export class ProductController {
  constructor(private readonly service: ProductService) {}
  
   createProductController = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id;

    const result = await this.service.createProduct(req.body, userId, req.files as Express.Multer.File[])

    sendResponse(res,201, "Product Created Successfully", result);
    
  });

   getProductsByCategoryController = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId as string;

    const result = await  this.service.getAllProducts(categoryId);

    sendResponse(res, 200, "Products Fetched Successfully", result);
    
  });



}
