import { Router } from 'express';
import { signupController } from '../controllers/authController';
import { signupMiddleware } from '../middlewares/validationMiddleware';

const authRouter = Router();
authRouter.post('/signup', signupMiddleware, signupController);

export default authRouter;
