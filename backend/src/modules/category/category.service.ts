import ApiError from "../../utils/ApiError.js";
import { ICategoryRepository } from "./category.interface.js";
import { toCategoryResponse } from "./category.mapper.js";
import { createCategoryDTO } from "./category.schema.js";

export class CategoryService{
    constructor(private readonly repo:ICategoryRepository){}

    async createCategory(data:createCategoryDTO){

        const category = await this.repo.findCategoryByName(data.categoryName);
        if(category){
            throw new ApiError(409, "Category this name already exists")
        }

        const newCategory = await this.repo.createCategory(data);

        
        return toCategoryResponse(newCategory);

    }
}