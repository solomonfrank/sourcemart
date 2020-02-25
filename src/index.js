import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger';
import apiRouter from './routes';
import AppError from './lib/globalError';
import errorHandler from './middlewares/globalErrorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// handle default route
const options = {
  explorer: true
};

app.get('/', async (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'welcome to project'
  })
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.use(apiRouter);

app.all('*', async (req, res, next) => {
  const err = new AppError(
    `${req.originalUrl} does not exist on the server`,
    404
  );

  next(err);
});
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});

process.on('unhandledRejection', () => {
  console.log('shutting down, unhandleRejection');

  server.close(() => {
    process.exit(1);
  });
});
