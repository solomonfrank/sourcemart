import { Router } from 'express';
import {
  getAllUsers,
  resetPassword,
  changePassword,
  addProfile,
  getProfile
} from '../controllers/userController';
import { jwtProtect } from '../middlewares/jwtAuthMiddleware';
import { validateResetToken } from '../middlewares/passwordResetTokenMiddleware';
import {
  resetPasswordValidation,
  profileValidation
} from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', jwtProtect, getAllUsers);
router.patch(
  '/resetPassword/:resetToken',
  resetPasswordValidation,
  validateResetToken,
  changePassword
);
router.patch('/resetPassword', resetPassword);
router.patch('/profile', jwtProtect, profileValidation, addProfile);
router.get('/profile', jwtProtect, getProfile);

export default router;
