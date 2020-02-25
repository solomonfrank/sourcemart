import AppError from '../lib/globalError';

const sendErrOnDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err.stack
  });

const sendErrOnProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err.stack
    });
  }

  return res.status(500).json({
    message: 'something went wrong!',
    status: 'error'
  });
};

const handleJwtExpired = () =>
  new AppError('token expired, please login again', 401);

const handleJwtError = () =>
  new AppError('invalid token, please login again', 401);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrOnDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'JsonWebTokenError') error = handleJwtError(err);

    if (error.name === 'TokenExpiredError') error = handleJwtExpired(err);
    sendErrOnProd(error, res);
  }
};

export default errorHandler;
