import sendToEmail from '../lib/sendMail';
import { SENDGRID_SIGNIP_TEMPLATE_ID } from '../config/constant';

export const sendEmailVerification = async (req, res) => {
  try {
    await sendToEmail(req.body.email)(SENDGRID_SIGNIP_TEMPLATE_ID, {
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      verificationLink: 'https://google.com'
    });

    return res.status(200).json({
      status: 'success',
      message: 'invitation sent successfully',
      payload: req.body
    });
  } catch (err) {
    return res.status(200).json({
      status: 'success',
      message: 'invitation sent successfully',
      payload: err.stack
    });
  }
};
