import signupSchema from '../validations/signupValidation';
import signinSchema from '../validations/signinValidation';
import joiSanitize from '../lib/getValidationError';
import profileSchema from '../validations/profileValiadation';
import catchAsync from '../lib/catchAsync';
import AppError from '../lib/globalError';
import resetPasswordSchema from '../validations/resetPassword';

export const signupMiddleware = async (req, res, next) => {
  try {
    const message = await joiSanitize(signupSchema, req.body);
    if (message) {
      return res.status(400).json({
        status: 'error',
        payload: message,
        message: 'Validation Error'
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      payload: null,
      message: 'Something went wrong!'
    });
  }
};

export const signinMiddleware = async (req, res, next) => {
  try {
    const message = await joiSanitize(signinSchema, req.body);
    if (message) {
      return res.status(400).json({
        status: 'error',
        payload: message,
        message: 'Validation Error'
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      payload: null,
      message: 'Something went wrong!'
    });
  }
};
export const resetPasswordValidation = async (req, res, next) => {
  try {
    const message = await joiSanitize(resetPasswordSchema, req.body);
    if (message) {
      return res.status(400).json({
        status: 'error',
        payload: message,
        message: 'Validation Error'
      });
    }
    next();
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: 'error',
      payload: null,
      message: 'Something went wrong!'
    });
  }
};

export const profileValidation = async (req, res, next) => {
  try {
    const message = await joiSanitize(profileSchema, req.body);
    if (message) {
      return res.status(400).json({
        status: 'error',
        payload: message,
        message: 'Validation Error'
      });
    }
    next();
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: 'error',
      payload: null,
      message: 'Something went wrong!'
    });
  }
};
