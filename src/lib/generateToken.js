import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { promisify } from 'util';
import AppError from './globalError';
import { findByPk } from '../services';
import Model from '../models/index';

const { Account } = Model;
export const createToken = (payload, secretKey, expiresIn) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  });

export const createTokens = (payload, refreshSecret) => {
  const token = createToken(
    payload,
    process.env.JWT_SECRET_KEY,
    `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
  );
  const refreshToken = createToken(
    payload,
    refreshSecret,
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
  );
  return [token, refreshToken];
};

export const jwtVerifyToken = token =>
  jwt.verify(token, process.env.JWT_SECRET_KEY);

export const refreshToken = async (__crt, next) => {
  const decoded = jwt.decode(__crt);

  if (!decoded.id) {
    return next(new AppError('unAuthorize, please login', 401));
  }
  const freshUser = await findByPk(Account, decoded.id);
  console.log(freshUser);

  if (!freshUser) {
    return next(new AppError('user does not exist', 401));
  }
  // eslint-disable-next-line operator-linebreak

  const refreshSecret =
    process.env.JWT_REFRESH_KEY + freshUser.toJSON().password;

  try {
    await promisify(jwt.verify)(__crt, refreshSecret);
  } catch (err) {
    return next(new AppError('you are not logged in from refreshtoken', 401));
  }

  const [accessToken, newRefreshToken] = createTokens(
    _.pick(freshUser.toJSON(), ['id', 'verified', 'blocked', 'role']),
    refreshSecret
  );

  if (accessToken && newRefreshToken) {
    return {
      accessToken,
      newRefreshToken
    };
  }
};
