import Model from '../models';
import AppError from '../lib/globalError';
import { findUser, updateUser } from './index';
import { resetPasswordToken } from '../lib/resetPasswordToken';
import catchAsync from '../lib/catchAsync';
import sendToEmail from '../lib/sendMail';
import { SENDGRID_SIGNIP_TEMPLATE_ID } from '../config/constant';
import { hashPassword } from '../lib/passwordOps';

const { Account, Profile } = Model;

export const changePasswordService = catchAsync(async (req, res, next) => {
  const hPassword = await hashPassword(req.body.password);

  await Account.update(
    {
      password: hPassword,
      changedPassword: `${new Date()}`,
      passwordResetToken: null,
      passwordResetTokenExpires: null
    },
    {
      where: {
        passwordResetToken: req.hashToken
      }
    }
  );
  return res.status(200).json({
    status: 'success',
    message: 'password changed successfully'
  });
});

export const resetPasswordService = catchAsync(async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const user = await findUser(Account, email);
  try {
    if (!user) {
      return next(new AppError('user does not esist', 404));
    }

    const [resetToken, passwordResetTokenHash] = resetPasswordToken();
    const payload = {
      passwordResetToken: passwordResetTokenHash,
      passwordResetTokenExpires: Date.now() + 15 * 60 * 1000
    };
    await updateUser(Account, req.body.email, payload);

    if (process.env.NODE_ENV === 'production') {
      await sendToEmail(req.body.email)(SENDGRID_SIGNIP_TEMPLATE_ID, {
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        verificationLink: `${process.env.CLIENT_BASE_URL}/resetPassword/${resetToken}`
      });

      return res.status(200).json({
        status: 'success',
        message: 'password reset link sent successfully'
      });
    }
  } catch (err) {
    const payload = {
      passwordResetToken: undefined,
      passwordResetTokenExpires: undefined
    };
    await updateUser(Account, req.body.email, payload);
    return next(new AppError('something went wrong', 500));
  }
});

export const addProfileService = catchAsync(async (req, res, next) => {
  const { id: accountId } = req.user;

  const account = await Profile.update(
    { ...req.body },
    {
      where: {
        accountId
      },
      returning: true,
      logging: false
    }
  );

  return res.status(200).json({
    status: 'success',
    message: 'provide successfully updated',
    payload: account
  });
});

export const getProfileService = catchAsync(async (req, res, next) => {
  const { id: accountId } = req.user;

  const profile = await Profile.findOne({
    where: {
      accountId
    },
    include: {
      model: Account,
      as: 'accountInfo',
      attributes: ['email']
    },
    logging: false
  });

  return res.status(200).json({
    status: 'success',
    payload: profile
  });
});
