import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';

import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerUserSchema,
} from './auth.schema.js';
import { authController } from './auth.container.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validate(registerUserSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/get-me', verifyUser, authController.getLoggedInUser);
router.post('/logout', verifyUser, validate(logoutSchema), authController.logout);
router.post('/logout-all', verifyUser, authController.logoutAll);
router.post(
  '/refresh-token',
  verifyUser,
//   validate(refreshTokenSchema),
  authController.refreshToken,
);

export default router;
