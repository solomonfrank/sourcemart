import dotenv from 'dotenv';

dotenv.config();

export const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  NODE_ENV,
  SENDGRID_API_KEY,
  SENDGRID_SIGNIP_TEMPLATE_ID,
  CLIENT_URL,
  SENDGRID_SIGNUP_FROM_EMAIL
} = process.env;
