import { ProductRepository } from "../product/product.repository.js";
import { CategoryController } from "./category.controller.js";
import { CategoryRepository } from "./category.repository.js";
import { CategoryService } from "./category.service.js";

const categoryRepo = new CategoryRepository();

const productRepo = new ProductRepository();

const service = new CategoryService(categoryRepo, productRepo);

const categoryController = new CategoryController(service);


export {categoryController};