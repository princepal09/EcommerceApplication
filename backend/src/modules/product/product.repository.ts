import { Product } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IProductRepository } from './product.interface.js';

export class ProductRepository implements IProductRepository {
  async createProduct(data: {
    userId: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productImagesUrls: [];
    price: any;
    stock: number;
  }): Promise<Product> {
    const newProduct = await prisma.product.create({
      data,
    });

    return newProduct;
  }

  async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
    });
    return products;
  }
}
