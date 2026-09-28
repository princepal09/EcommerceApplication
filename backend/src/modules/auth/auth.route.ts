import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';

import { loginSchema, registerUserSchema } from './auth.schema.js';
import { authController } from './auth.container.js';

const router = express.Router();

router.post('/register', validate(registerUserSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);


export default router;