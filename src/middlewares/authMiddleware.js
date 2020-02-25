// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import Model from '../models';

import AppError from '../lib/globalError';

import { findUser } from '../services/index';
import { comparePassord } from '../lib/passwordOps';

const { Account } = Model;

export const signinAuth = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUser(Account, email);

  if (!user) {
    return next(new AppError('Invalid credential', 400));
  }

  if (!(await comparePassord(password, user.password))) {
    return next(new AppError('Invalid credential', 400));
  }

  if (user && user.toJSON().blocked) {
    return next(
      new AppError(
        'Account is blocked, please contact the system administrator',
        401
      )
    );
  }

  req.user = user.toJSON();
  next();
};
