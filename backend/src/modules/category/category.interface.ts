import { Category } from "../../../generated/prisma/client.js";

export interface ICategoryRepository{
     createCategory(data:{categoryName:string, categoryDescription:string}):Promise<Category>;


}