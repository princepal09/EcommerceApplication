import { Product } from '../../../generated/prisma/client.js';
import { ProductResponseDTO } from './product.response.js';

export const toProductResponse = (product: Product) : ProductResponseDTO => {
  return {
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
    productImagesUrls: product.productImagesUrls,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
