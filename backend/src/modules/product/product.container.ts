import { ProductController } from './product.controller.js';
import { ProductRepository } from './product.repository.js';
import { ProductService } from './product.service.js';

const repository = new ProductRepository();

const service = new ProductService(repository);

const productController = new ProductController(service);

export { productController };
