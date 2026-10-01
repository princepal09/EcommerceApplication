import { Product } from '../../../generated/prisma/client.js';
import { editProductDTO } from './product.schema.js';

export interface IProductRepository {
  createProduct(data: {
    userId: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productImagesUrls: string[];
    price: any;
    stock: number;
  }): Promise<Product>;

  getProductsByCategoryId(cateogryId: string): Promise<Product[]>;

  getAllProducts(): Promise<Product[]>;

  editProduct(data: editProductDTO, productId: string, sellerId: string): Promise<Product>;

  getProductById(productId: string): Promise<Product | null>;

  getProductByIdAndSellerId(productId: string, sellerId: string): Promise<Product | null>;
}
