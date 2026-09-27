import { AuthController } from './auth.controller.js';
import { AuthRepository } from './auth.repository.js';
import { AuthService } from './auth.service.js';

const repository = new AuthRepository();

const service = new AuthService(repository);

const authController = new AuthController(service);


export {authController};