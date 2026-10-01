import { Prisma } from '../../../generated/prisma/client.js';
import ApiError from '../../utils/ApiError.js';
import { uploadToCloudinary } from '../../utils/cloudinar.helper.js';
import { IProductRepository } from './product.interface.js';
import { toProductResponse, toProductResponseList } from './product.mapper.js';
import { createProductDTO, editProductDTO } from './product.schema.js';

export class ProductService {
  constructor(private readonly repo: IProductRepository) {}

  async createProduct(data: createProductDTO, userId: string, files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new ApiError(400, 'At least one product image is required');
    }

    const imageUrls = await Promise.all(files.map((file) => uploadToCloudinary(file.buffer)));

    const newProduct = await this.repo.createProduct({
      userId: userId,
      categoryId: data.categoryId,
      productName: data.productName,
      productDescription: data.productDescription,
      productImagesUrls: imageUrls,
      price: new Prisma.Decimal(data.price),
      stock: Number(data.stock),
    });

    return toProductResponse(newProduct);
  }

  async getAllProductsByCategoryId(categoryId: string) {
    if (!categoryId) {
      throw new ApiError(404, 'Category not found');
    }

    const products = await this.repo.getProductsByCategoryId(categoryId);

    if ((await products).length <= 0) {
      throw new ApiError(404, 'No Products belong to category');
    }

    return toProductResponseList(products);
  }

  async getAllProducts() {
    const products = await this.repo.getAllProducts();
    return toProductResponseList(products);
  }

  async updateProduct(data: editProductDTO, productId: string, sellerId: string) {
    if (!productId) {
      throw new ApiError(404, 'Product Id not found');
    }

    const product = await this.repo.getProductByIdAndSellerId(productId, sellerId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const updatedProduct = await this.repo.editProduct(data, productId, sellerId);

    if (!updatedProduct) {
      throw new ApiError(404, 'Product has not been updated');
    }

    return toProductResponse(updatedProduct);
  }
}
