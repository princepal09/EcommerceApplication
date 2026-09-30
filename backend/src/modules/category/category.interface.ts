import { Category } from "../../../generated/prisma/client.js";

export interface ICategoryRepository{
     createCategory(data:{categoryName:string, categoryDescription:string}):Promise<Category>;

     findCategoryByName(categoryName:string):Promise<Category | null>;

     deleteCategoryById(categoryId : string) : Promise<void>

     findCategoryById(categoryId:string) : Promise<Category | null>
     
     findAllCategories() : Promise<Category[] | null>

}