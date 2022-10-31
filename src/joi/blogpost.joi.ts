import Joi from "joi";


export const BlogPostInputSchema = Joi.object({
  id: Joi.string().min(36).required(),
  title: Joi.string().min(5).required(),
  content: Joi.string().min(30).required(),
  image: Joi.string().min(38).regex(/[.jpg]$/),
});

export const DelBlogPostInputSchema = Joi.object({
  id: Joi.string().min(36).required(),
});
