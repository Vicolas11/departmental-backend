import { BlogPost, Staff, PrismaClient, Student } from "@prisma/client";
import { Request } from "express";

export interface IContext {
  loaders: {
    student: {
      one: (id: string) => Promise<Student>;
    };
    staff: {
      one: (id: string) => Promise<Staff>;
    };
    blogPost: {
      one: (id: string) => Promise<BlogPost>;
    };
  };
  prisma: PrismaClient;
  auth: string;
  req: Request;
}
