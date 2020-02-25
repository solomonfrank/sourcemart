import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { jwtProtect } from '../middlewares/jwtAuthMiddleware';

const router = Router();

router.get('/', jwtProtect, getAllUsers);

export default router;
