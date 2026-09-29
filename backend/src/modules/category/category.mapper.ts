import { Category } from "../../../generated/prisma/client.js"
import { CategoryResponseDTO } from "./cateogry.response.js"

export const toCategoryResponse = (category:Category):CategoryResponseDTO => {
    return {
        id:category.id,
        categoryName:category.categoryName,
        categoryDescription:category.categoryDescription,
        createdAt : category.createdAt,
        updatedAt:category.updatedAt
    }
}