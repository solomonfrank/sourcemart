import { Router } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', authRoute);
apiRouter.use('/api/v1/user', userRoute);

export default apiRouter;
