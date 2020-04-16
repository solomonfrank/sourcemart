import AppError from '../lib/globalError';
import { jwtVerifyToken, refreshToken } from '../lib/generateToken';
import { isPasswordChanged } from '../lib/passwordOps';
import catchAsync from '../lib/catchAsync';
import Model from '../models';
import { findByPk } from '../services/index';
import { createCookie } from '../lib/createCookie';

const { Account } = Model;

export const jwtProtect = catchAsync(async (req, res, next) => {
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   // eslint-disable-next-line prefer-destructuring
  //   token = req.headers.authorization.split(' ')[1];
  // }
  // eslint-disable-next-line no-underscore-dangle
  const token = req.cookies.__cnt;

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  try {
    const decoded = await jwtVerifyToken(token);

    if (decoded.blocked) {
      return next(
        new AppError(
          'Your account has been blocked, contact system administrator ',
          401
        )
      );
    }

    const freshUser = await findByPk(Account, decoded.id);

    if (!freshUser) {
      return next(new AppError('user from does not exist', 401));
    }
    const passwordChangeAt = Math.round(
      new Date(`${freshUser.toJSON().changedPassword}`).getTime() / 1000
    );

    if (isPasswordChanged(decoded.iat, passwordChangeAt)) {
      return next(
        new AppError(
          'You are not logged in, please login with correct details',
          401
        )
      );
    }
    req.user = freshUser.toJSON();

    next();
  } catch (err) {
    const { __crt: refrToken } = req.cookies;

    const { accessToken, newRefreshToken } = await refreshToken(
      refrToken,
      next
    );

    if (accessToken && newRefreshToken) {
      createCookie(
        res,
        accessToken,
        '__cnt',
        process.env.ACCESS_TOKEN_COOKIE_EXPIRES
      );
      createCookie(
        res,
        newRefreshToken,
        '__crt',
        process.env.REFRESH_TOKEN_COOKIE_EXPIRES
      );

      next();
    }
  }
});
