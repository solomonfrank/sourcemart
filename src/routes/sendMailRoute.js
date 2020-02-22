import { Router } from 'express';
import {
  sendEmailVerification,
  sendEmailVerificationValidation
} from '../controllers/emailController';
import sendMail from '../lib/sendMail';

const router = Router();
router.post('/send-mail', sendEmailVerification);

export default router;
