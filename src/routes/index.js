import { Router } from 'express';
import authRoute from './authRoute';
import mailRouter from './sendMailRoute';

const apiRouter = Router();
apiRouter.use('/api/v1/auth', authRoute);
apiRouter.use('/api/v1', mailRouter);

export default apiRouter;
