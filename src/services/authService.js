import Model from '../models';
import { findOrCreate } from './index';
import { hashPassword } from '../lib/passwordOps';
import { createToken } from '../lib/generateToken';
import sendToEmail from '../lib/sendMail';
import { SENDGRID_SIGNIP_TEMPLATE_ID } from '../config/constant';
import AppError from '../lib/globalError';
import catchAsync from '../lib/catchAsync';

const { Account } = Model;

export const signupService = catchAsync(async (req, res, next) => {
  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();

  const [account, created] = await findOrCreate(Account, {
    ...req.body,
    password,
    email
  });

  if (!created) {
    return next(new AppError('user already exist', 400));
  }

  const accessToken = createToken(
    { id: account.id, isAdmin: account.isAdmin },
    process.env.JWT_SECRET_KEY,
    '1h'
  );
  if (process.env.NODE_ENV === 'production') {
    await sendToEmail(req.body.email)(SENDGRID_SIGNIP_TEMPLATE_ID, {
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      verificationLink: `${process.env.CLIENT_BASE_URL}/email-verification?token=${accessToken}`
    });
  }

  const fullName = `${req.body.firstName} ${req.body.lastName}`;
  await account.createUserInfo({ fullName });
  account.dataValues.token = accessToken;

  return res.status(201).json({
    status: 'success',
    message: 'user successfully created',
    payload: account.toJSON()
  });
});
