import Joi from "joi";

export const changePswInputSchema = Joi.object({
  id: Joi.string().min(36),
  password: Joi.string().min(6).required(),  
  new_password: Joi.string().min(6).required(),
  con_password: Joi.ref('new_password'),
}).with('new_password', 'con_password');