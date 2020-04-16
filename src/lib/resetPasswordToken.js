import crypto from 'crypto';

export const hashResetToken = token => {
  const hashToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  return hashToken;
};

export const generateRandomString = () =>
  crypto.randomBytes(32).toString('hex');

export const resetPasswordToken = () => {
  const resetToken = generateRandomString();

  const passwordResetTokenHash = hashResetToken(resetToken);
  return [resetToken, passwordResetTokenHash];
};
