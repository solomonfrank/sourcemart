import Model from '../models';
import { findOrCreate } from './index';
import { hashPassword } from '../lib/passwordOps';
import { createToken } from '../lib/generateToken';
import sendToEmail from '../lib/sendMail';
import { SENDGRID_SIGNIP_TEMPLATE_ID } from '../config/constant';

const { Account } = Model;

export const signupService = async (req, res, payload) => {
  try {
    const password = await hashPassword(payload.password);
    const email = payload.email.toLowerCase();

    const [account, created] = await findOrCreate(Account, {
      ...payload,
      password,
      email
    });

    if (!created) {
      return res.status(400).json({
        status: 'fail',
        message: 'user already exist',
        payload: null
      });
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
    account.dataValues.token = accessToken;

    return res.status(201).json({
      status: 'success',
      message: 'user successfully created',
      payload: account.toJSON()
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
      payload: err.stack
    });
  }
};
