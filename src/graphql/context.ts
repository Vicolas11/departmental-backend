import { IRequest } from "../interfaces/request.interface";
import { IContext } from "../interfaces/context.interface";
import { getBlogPostByIDs } from "./data/blogpostData";
import { ContextFunction } from "apollo-server-core";
import { getStudentByIDs } from "./data/studentData";
import { getStaffByIDs } from "./data/staffData";
import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

const prisma = new PrismaClient();

// STUDENT LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const studentLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getStudentByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

// STAFF LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const staffLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getStaffByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

// BLOG LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const blogPostLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getBlogPostByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

const context: ContextFunction<IContext> = async ({ req }: IRequest) => {
  const auth = req.headers.authorization || "";
  return {
    loaders: {
      student: studentLoader(),
      staff: staffLoader(),
      blogPost: blogPostLoader(),
    },
    prisma,
    auth: auth,
  };
};

export { prisma };
export default context;
