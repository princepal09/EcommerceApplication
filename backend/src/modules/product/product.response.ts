import { Decimal } from "@prisma/client/runtime/client";

export interface ProductResponseDTO {
  id: string;
  productName: string;
  productDescription: string;
  productImagesUrls:string[];
  price: Decimal;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
