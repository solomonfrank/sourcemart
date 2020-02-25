import { Router } from 'express';
import {
  signupController,
  signinController
} from '../controllers/authController';
import {
  signupMiddleware,
  signinMiddleware
} from '../middlewares/validationMiddleware';
import { signinAuth } from '../middlewares/authMiddleware';

const authRouter = Router();
authRouter.post('/signup', signupMiddleware, signupController);
authRouter.post('/signin', signinMiddleware, signinAuth, signinController);

export default authRouter;
