import { signupService } from '../services/authService';

export const signupController = async (req, res) => {
  try {
    await signupService(req, res, req.body);
  } catch (err) {
    console.log(err.stack);
  }
};
