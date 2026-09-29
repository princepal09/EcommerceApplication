import express from 'express';
import { createCategorySchema } from './category.schema.js';
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



export default router;
