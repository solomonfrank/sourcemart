import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';

const Joi = BaseJoi.extend(Extension);

const signupSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required(),

  confirmPassword: Joi.ref('password'),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  changedPassword: Joi.date().format('YYYY-MM-DD')
});

export default signupSchema;
