import Joi from "joi";

export const OrganisationInputSchema = Joi.object({
  name: Joi.string().min(5).max(150).required(),
  sector: Joi.string().valid(
    "ICT",
    "Healthcare",
    "Agriculture",
    "Transportation",
    "Energy",
    "Commercial",
    "Financial",
    "Aviation",
    "Construction",
    "Manufacturing",
    "Education",
    "Fashion",
    "Logistics",
    "Tourism",
    "Telecommunication",
    "Entertainment",
    "Legal",
    "Consultancy",
    "Religion",
    "Oil",
    "Others"
  ).required(),
  phone: Joi.string().min(5).max(18),
  address: Joi.string().min(10).required(),
  employees: Joi.number(),
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
  logo: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const UpdateOrganisationInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
  name: Joi.string().min(5).max(150).required(),
  sector: Joi.string().valid(
    "ICT",
    "Healthcare",
    "Agriculture",
    "Transportation",
    "Energy",
    "Commercial",
    "Financial",
    "Aviation",
    "Construction",
    "Manufacturing",
    "Education",
    "Fashion",
    "Logistics",
    "Tourism",
    "Telecommunication",
    "Entertainment",
    "Legal",
    "Consultancy",
    "Religion",
    "Oil",
    "Others"
  ).required(),
  phone: Joi.string().min(5).max(18),
  address: Joi.string().min(10).required(),
  employees: Joi.number(),
  logo: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const DelOrganisationInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});
