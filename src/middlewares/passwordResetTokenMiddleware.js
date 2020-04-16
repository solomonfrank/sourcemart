import Model from '../models';
import { hashResetToken } from '../lib/resetPasswordToken';
import AppError from '../lib/globalError';

import catchAsync from '../lib/catchAsync';

const { Account } = Model;
export const validateResetToken = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;

  const hashToken = hashResetToken(resetToken);

  const user = await Account.findOne({
    where: {
      passwordResetToken: hashToken,
      passwordResetTokenExpires: {
        [Model.Sequelize.Op.gt]: Date.now()
      }
    },
    logging: false
  });

  if (!user) {
    return next(new AppError('invalid reset token or token has expired', 400));
  }
  req.user = user;
  req.hashToken = hashToken;
  next();
});
