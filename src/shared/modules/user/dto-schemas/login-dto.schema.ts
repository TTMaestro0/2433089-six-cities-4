import Joi from 'joi';

export const loginDtoSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(12)
});
