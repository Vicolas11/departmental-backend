import Joi from "joi";

export const FileInputSchema = Joi.object({
  file: Joi.any(),
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});

export const FileUpdateInputSchema = Joi.object({
  id: Joi.string().min(36).required(),
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});
