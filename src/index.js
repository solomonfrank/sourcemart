import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// handle default route
app.get('/', async (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'welcome to project'
  })
);

app.use(apiRouter);
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
