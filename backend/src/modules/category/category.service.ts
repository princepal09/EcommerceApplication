import ApiError from '../../utils/ApiError.js';
import { IProductRepository } from '../product/product.interface.js';
import { ICategoryRepository } from './category.interface.js';
import { toCategoryResponse } from './category.mapper.js';
import { createCategoryDTO, updateCategoryDTO } from './category.schema.js';

export class CategoryService {
  constructor(
    private readonly repo: ICategoryRepository,
    private readonly productRepo: IProductRepository,
  ) {}

  async createCategory(data: createCategoryDTO) {
    const category = await this.repo.findCategoryByName(data.categoryName);
    if (category) {
      throw new ApiError(409, 'Category this name already exists');
    }

    const newCategory = await this.repo.createCategory(data);

    return toCategoryResponse(newCategory);
  }

  async deleteCategory(categoryId: string) {
    if (!categoryId) {
      throw new ApiError(404, 'Category Id not found');
    }
    const category = await this.repo.findCategoryById(categoryId);

    const products = await this.productRepo.getProductsByCategoryId(categoryId);
    if (products.length < 0) {
      throw new ApiError(400, 'Category that contains products cannot be deleted.');
    }
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    await this.repo.deleteCategoryById(categoryId);
  }

  async getAllCategories() {
    const categories = await this.repo.findAllCategories();

    return categories;
  }

  async updateCategory(categoryId: string, data: updateCategoryDTO) {
    if (!categoryId) {
      throw new ApiError(404, 'Category not found');
    }
    const category = await this.repo.findCategoryById(categoryId);

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    const updatedCategory = await this.repo.updateCategory(categoryId, data);

    if(!updatedCategory){
        throw new ApiError(401, "Cannot update the category")
    }

    return toCategoryResponse(updatedCategory); 
  }
}
