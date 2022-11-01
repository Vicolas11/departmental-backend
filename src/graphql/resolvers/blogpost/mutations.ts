import { BlogPostInputSchema, DelBlogPostInputSchema } from "../../../joi/blogpost.joi";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ReturnBlogPost } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";
import titleCase from "../../../utils/titlecase.utl";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

// Sadiq suwaibah Ohunene SCI17CSC127

// Sadiq suwaibah Ohunene SCI17CSC127
const blogPostMutations: MutationResolvers = {
    // CREATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    blogPost: async (_, { registerInput: input }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { email: loginUserEmail, role } = user;
  
      // Authenticate user
      if (!user || loginUserEmail === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      // Authorize the user to be an Admin
      if (role !== 'Admin')
        throw new AuthenticationError("Not authorized!");
  
      const { title: tit } = input;
  
      // Validate Input field
      const validate = BlogPostInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
  
      const title = titleCase(tit);
  
      // Check if BlogPost Title Already Exist
      const blogPostExist = await prisma.blogPost.findUnique({
        where: { title },
      });
  
      if (blogPostExist)
        throw new AuthenticationError(
          "BlogPost with this title already existed!"
        );
  
      // Create New BlogPost User
      const data = {
        ...input,
        id: uuid(),
      };
  
      const newBlogPost = await prisma.blogPost.create({ data });
  
      return {
        status: 201,
        message: "Created blog post successfully!",
        blogpost: newBlogPost,
      } as ReturnBlogPost;
    },
  
    // UPDATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateBlogPost: async (_, { input }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { email: loginUserEmail, role } = user;
  
      // Authenticate user
      if (!user || loginUserEmail === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      // Authorize the user to be either a Coordinator or an Admin
      if (role !== 'Admin')
        throw new AuthenticationError("Not authorized!");
  
      const { id, title: tit, content, image } = input;
  
      // Validate Input field
      const validate = BlogPostInputSchema.validate(input);
      const { error } = validate;
      const title = titleCase(tit);
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
  
      // Check if BlogPost Already Exist
      const blogPostExist = await prisma.blogPost.findFirst({
        where: { id },
      });
  
      if (!blogPostExist) {
        throw new AuthenticationError("BlogPost doesn't exist!");
      }
  
      // Update BlogPost User
      const data = { title, content, image };
      const updatedBlogPost = await prisma.blogPost.update({
        where: { id },
        data,
      });
  
      return {
        status: 201,
        message: "Updated blog post successfully!",
        blogpost: updatedBlogPost,
      } as ReturnBlogPost;
    },
  
    // DElETE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteBlogPost: async (_, { input }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { email: loginUserEmail, role } = user;
  
      // Authenticate user
      if (!user || loginUserEmail === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      // Authorize the user to be either a Coordinator or an Admin
      if (role !== 'Coordinator' && role !== 'Admin')
        throw new AuthenticationError("Not authorized!");
        
      const { id: blogID } = input;
  
      // Validate Input field
      const validate = DelBlogPostInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Error! Invalid blogPost ID!"
        );
  
      // Check if BlogPost Already Exist
      const blogPostExist = await prisma.blogPost.findUnique({
        where: { id: blogID },
      });
  
      if (!blogPostExist) {
        throw new AuthenticationError("Blog post doesn't exist!");
      }
  
      // Delete BlogPost
      const deletedBlogPost = await prisma.blogPost.delete({
        where: { id: blogID },
      });
  
      return {
        status: 200,
        message: "Deleted blog post successfully!",
        blogpost: deletedBlogPost,
      } as ReturnBlogPost;
    },
  };
  
  export default blogPostMutations;
  
  
  
  