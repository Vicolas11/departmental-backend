import { BlogPostInputSchema, DelBlogPostInputSchema } from "../../../joi/blogpost.joi";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ReturnBlogPost } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";
import titleCase from "../../../utils/titlecase.utl";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

// Sadiq suwaibah Ohunene SCI17CSC127

