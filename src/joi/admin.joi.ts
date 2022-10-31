import Joi from "joi";

export const AdminInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const UpdateAdminInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const DelAdminInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});
