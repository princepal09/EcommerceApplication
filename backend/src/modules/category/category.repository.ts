import { Category } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { ICategoryRepository } from './category.interface.js';

export class CategoryRepository implements ICategoryRepository {
  async createCategory(data: {
    categoryName: string;
    categoryDescription: string;
  }): Promise<Category> {
    const newCategory = await prisma.category.create({
      data,
    });

    return newCategory;
  }

  async findCategoryByName(categoryName: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        categoryName,
      },
    });
    return category;
  }
}
