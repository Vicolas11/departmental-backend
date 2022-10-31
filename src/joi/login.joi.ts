import Joi from "joi";

export const StudentLoginInputSchema = Joi.object({
  matricNo: Joi.string().length(11).uppercase().alphanum().required(),
  password: Joi.string().min(6).required(),
});

export const StaffLoginInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
});

export const AdminLoginInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
});