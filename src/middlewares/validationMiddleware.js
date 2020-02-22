import signupSchema from '../validations/signupValidation';
import joiSanitize from '../lib/getValidationError';

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
