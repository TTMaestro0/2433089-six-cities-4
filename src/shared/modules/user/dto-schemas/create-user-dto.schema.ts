import Joi from 'joi';
import { UserType } from '../../../types/index.js';

export const createUserDtoSchema = Joi.object({
  email: Joi.string().required().email(),
  avatarUrl: Joi.string().uri(),
  name: Joi.string().required().min(1).max(15),
  password: Joi.string().required().min(6).max(12),
  type: Joi.string().required().valid(...Object.values(UserType))
});
