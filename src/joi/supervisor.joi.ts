import Joi from "joi";

export const SupervisorInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  staffID: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  institute: Joi.string().required(),
  department: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female"),
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const UpdateSupervisorInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  email: Joi.string().min(5).email().required(),
  gender: Joi.string().valid("Male", "Female"),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const DelSupervisorInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});
