import express from 'express';
import { productController } from './product.container.js';
import { verifySeller, verifyUser } from '../../middlewares/auth.middleware.js';
import { createProductSchema } from './product.schema.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { upload } from '../../middlewares/multer.middleware.js';

const router = express.Router();

router.post(
  '/',
  verifyUser,
  verifySeller,
  upload.array('images'),
  validate(createProductSchema),
  productController.createProductController,
);

router.get('/:categoryId', productController.getProductsByCategoryController);

export default router;
