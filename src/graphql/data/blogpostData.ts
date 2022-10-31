import { AuthenticationError } from "apollo-server-express";
import { BlogPost } from "@prisma/client";
import { prisma } from "../context";

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const blogPosts = await prisma.blogPost.findMany();
  return blogPosts;
};

const getBlogPostByID = async (id: string): Promise<BlogPost | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const blogPost = await prisma.blogPost.findUnique({ where: { id } });
  if (!blogPost) throw new AuthenticationError("BlogPost not found!");
  return blogPost;
};

export const getBlogPostByIDs = (ids: string[]): Promise<BlogPost | null>[] => {
  return ids.map((id) => getBlogPostByID(id));
};
