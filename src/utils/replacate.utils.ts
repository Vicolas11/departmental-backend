import { AuthenticationError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import getUser from "./getuser.util";

export const replicateStudAuth = async(token: string, id: string, prisma: PrismaClient): Promise<void> => {
  const user = getUser(token);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");
  
  console.log("ROLE =>", role);

  // Authorize the user to be either a Student or an Admin
  if ((role !== "Student" && role !== "Admin"))
    throw new AuthenticationError("Not authorized!");
  
  // Check if Student Already Exist
  const studExist = await prisma.student.findUnique({
    where: { id },
  });

  if (!studExist)
    throw new AuthenticationError("Student doesn't exist!");

  // if (loginUserId !== id)
  //   throw new AuthenticationError("Not authorized! Not genuine user");

};

export const replicateStaffAuth = async(token: string, id: string, prisma: PrismaClient): Promise<void> => {
  const user = getUser(token);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Staff or an Admin
  if (role !== "Staff" && role !== "Admin")
    throw new AuthenticationError("Not authorized!");
  
  // Check if Staff Already Exist
  const staffExist = await prisma.staff.findUnique({
    where: { id },
  });

  if (!staffExist)
    throw new AuthenticationError("Staff doesn't exist!");

  // if (loginUserId !== id) 
  //   throw new AuthenticationError("Not authorized! Not genuine user");

  // return loginUserId;
};

export const replicateAdminAuth = (token: string): void => {
  
  const user = getUser(token);
  const { email, role } = user;

  // Authenticate user
  if (!user || email === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Staff or an Admin
  if (role !== "Admin") 
    throw new AuthenticationError("Not authorized!");
};
