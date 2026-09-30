import { Category } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { ICategoryRepository } from './category.interface.js';
import { updateCategoryDTO } from './category.schema.js';

export class CategoryRepository implements ICategoryRepository {
  async createCategory(data: {
    categoryName: string;
    categoryDescription: string;
  }): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  async findCategoryByName(categoryName: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        categoryName,
      },
    });
    return category;
  }

  async findCategoryById(categoryId: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category;
  }

  async deleteCategoryById(categoryId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    
  }

  async findAllCategories(): Promise<Category[] | null> {
    const categories = await prisma.category.findMany({});

    return categories;
  }


  async updateCategory(categoryId: string, data: updateCategoryDTO): Promise<Category | null> {
    return prisma.category.update({
      where : {
        id : categoryId
      },
      data
    })
  }
}
