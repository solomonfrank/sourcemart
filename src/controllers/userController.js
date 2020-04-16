import {
  resetPasswordService,
  changePasswordService,
  addProfileService,
  getProfileService
} from '../services/userServices';

export const getAllUsers = (req, res) =>
  res.status(200).json({ status: 'success' });

export const resetPassword = async (req, res, next) => {
  resetPasswordService(req, res, next);
};

export const changePassword = async (req, res, next) => {
  changePasswordService(req, res, next);
};

export const addProfile = async (req, res, next) => {
  addProfileService(req, res, next);
};

export const getProfile = async (req, res, next) => {
  getProfileService(req, res, next);
};
