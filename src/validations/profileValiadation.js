import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';

const Joi = BaseJoi.extend(Extension);

const profileSchema = Joi.object({
  fullName: Joi.string().required(),

  gender: Joi.string(),
  address: Joi.string().required(),
  stateId: Joi.number().integer(),
  countryId: Joi.number().integer(),

  dateOfBirth: Joi.date().format('YYYY-MM-DD')
});

export default profileSchema;
