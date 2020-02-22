import sendgrid from '@sendgrid/mail';
import {
  SENDGRID_API_KEY,
  SENDGRID_SIGNUP_FROM_EMAIL
} from '../config/constant';

export const sendMail = mailInfo => {
  sendgrid.setApiKey(SENDGRID_API_KEY);
  console.log(mailInfo);

  return sendgrid.send({ ...mailInfo });
};

const sendToEmail = email => (templateId, dynamicTemplateDdata) =>
  sendMail({
    to: email,
    from: `"madeinAba.com" <${SENDGRID_SIGNUP_FROM_EMAIL}>`,
    templateId,
    dynamic_template_data: { ...dynamicTemplateDdata }
  });

export default sendToEmail;
