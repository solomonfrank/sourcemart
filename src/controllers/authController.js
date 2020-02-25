import _ from 'lodash';
import { signupService } from '../services/authService';
import { createTokens } from '../lib/generateToken';
import { respondWithSuccess } from '../lib/httpResponse';
import catchAsync from '../lib/catchAsync';
import { createCookie } from '../lib/createCookie';

export const signupController = catchAsync(async (req, res, next) => {
  await signupService(req, res, next);
});

export const signinController = async (req, res) => {
  const refreshSecret = process.env.JWT_REFRESH_KEY + req.user.password;

  const [token, refreshToken] = createTokens(
    {
      id: req.user.id,
      verified: req.user.verified,
      blocked: req.user.blocked,
      role: req.user.role
    },
    refreshSecret
  );

  const payload = { ...req.user, token, refreshToken };
  createCookie(res, token, '__cnt', process.env.JWT_ACCESS_TOKEN_EXPIRES);
  createCookie(
    res,
    refreshToken,
    '__crt',
    process.env.JWT_REFRESH_TOKEN_EXPIRES
  );
  return respondWithSuccess(
    res,
    200,
    'logged in successfully',
    _.omit(payload, ['password'])
  );
};
