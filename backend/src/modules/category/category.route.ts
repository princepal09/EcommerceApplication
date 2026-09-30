import express from 'express';
import { createCategorySchema, updateCategorySchema } from './category.schema.js';
import { categoryController } from './category.container.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { verifyAdmin, verifyUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/',
  verifyUser,
  verifyAdmin,
  validate(createCategorySchema),
  categoryController.createController,
);

router.delete(
  '/:categoryId',
  verifyUser,
  verifyAdmin,
  categoryController.deleteController,
);

router.get(
  '/',
  verifyUser,
  verifyAdmin,
  categoryController.getAllCategoriesController,
);

router.patch(
  '/:categoryId',
  verifyUser,
  verifyAdmin,
  validate(updateCategorySchema),
  categoryController.updateCategoryController,
);

export default router;
