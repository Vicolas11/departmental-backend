import { AuthenticationError } from "apollo-server-express";
import { Staff } from "@prisma/client";
import { prisma } from "../context";

export const getAllStaffs = async (): Promise<Staff[]> => {
  const staffs = await prisma.staff.findMany();
  return staffs;
};

const getStaffByID = async (id: string): Promise<Staff | null> => {
  // console.log(`Called getUserById for id: ${id}`);
  const staff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!staff) throw new AuthenticationError("Staff not found!");

  return staff;
};

export const getStaffByIDs = (ids: string[]): Promise<Staff | null>[] => {
  return ids.map((id) => getStaffByID(id));
};
