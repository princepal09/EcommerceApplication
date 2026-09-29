import { ICategoryRepository } from "./category.interface.js";
import { toCategoryResponse } from "./category.mapper.js";
import { createCategoryDTO } from "./category.schema.js";

export class CategoryService{
    constructor(private readonly repo:ICategoryRepository){}

    async createCategory(data:createCategoryDTO){

        const newCategory = await this.repo.createCategory(data);
        return toCategoryResponse(newCategory);

    }
}