import { CategoryController } from "./category.controller.js";
import { CategoryRepository } from "./category.repository.js";
import { CategoryService } from "./category.service.js";

const repository = new CategoryRepository();

const service = new CategoryService(repository);

const categoryController = new CategoryController(service);


export {categoryController};