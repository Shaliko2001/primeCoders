import Joi from 'joi';

export const positiveNumber = Joi.number().min(1);
export const ID = positiveNumber.integer();
export const Index = Joi.number().min(0);
export const limit = Joi.number().min(0).default(100);
export const offset = Joi.number().min(0).default(0);
