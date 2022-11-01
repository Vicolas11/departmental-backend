import { DelStaffInputSchema, StaffInputSchema, UpdateStaffInputSchema } from "../../../joi/staff.joi";
import { DeletedStaff, MutationResolvers, ReturnRegisteredStaff } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

// Adeyemi Ayomide Adetumininu SCI17CSC018 input your code here
const staffMutations: MutationResolvers = {
    // CREATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    staff: async (_, { registerInput: input }, { prisma }) => {
      const { email, staffID } = input;
      // Validate Input field
      const validate = StaffInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
  
      // Check if Email Already Exist as Student and Staff
      const studentExist = await prisma.student.findUnique({
        where: { email },
      });
  
      if (studentExist)
        throw new AuthenticationError("User already existed!");
  
      const staffExist = await prisma.staff.findUnique({
        where: { email },
      });
  
      if (staffExist)
        throw new AuthenticationError("Staff already existed!");
  
      // Hashed and Replaced Password Input
      const hashPwd = await hashPassword(input.password);
      input.password = hashPwd;
      input.staffID = staffID.toUpperCase();
  
      // Create New staff User
      const staffData = {
        ...input,
        id: uuid(),
      };
  
      const newStaff = await prisma.staff.create({
        data: staffData,
      });
  
      // Remove the password field for security reasons
      Reflect.deleteProperty(newStaff, "password");
  
      // Generate Access and Refreshed Token
      const accessToken = await signAccessJWToken({
        id: newStaff.id,
        email: newStaff.email,
        role: newStaff.user,
      });
  
      const refreshToken = await signRefreshJWToken({
        id: newStaff.id,
        email: newStaff.email,
        role: newStaff.user,
      });
  
      const encryptAccessToken = encryptToken(accessToken);
      const encryptRefreshToken = encryptToken(refreshToken);
  
      return {
        status: 201,
        message: "Created Staff successfully!",
        accessToken: encryptAccessToken,
        refreshToken: encryptRefreshToken,
        staff: newStaff,
      } as ReturnRegisteredStaff;
    },
  
    // UPDATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateStaff: async (_, { updateInput: input }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { email: loginUserEmail, role } = user;
  
      // Authenticate user
      if (!user || loginUserEmail === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      // Authorize the user to be either a staff or an Admin
      if (role !== 'Staff' && role !== 'Admin')
        throw new AuthenticationError("Not authorized!");
  
      const { firstName, lastName, phone, gender, avatar, email } = input;
  
      // Validate Input field
      const validate = UpdateStaffInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
  
      // Check if Email Already Exist
      const staffExist = await prisma.staff.findUnique({
        where: { email },
      });
  
      if (!staffExist) {
        throw new AuthenticationError("Staff doesn't exist!");
      }
  
      // Authorized Genuine Login User
      if (loginUserEmail !== email) {
        throw new AuthenticationError("Not authorized: not a genuine user!");
      }
  
      // Update staff User
      const updateStaffData = {
        firstName,
        lastName,
        phone,
        gender,
        avatar,
      };
  
      const updatedStaff = await prisma.staff.update({
        where: { email: loginUserEmail },
        data: updateStaffData,
      });
  
      // Generate Access and Refreshed Token
      const accessToken = await signAccessJWToken({
        id: updatedStaff.id,
        email: updatedStaff.email,
        role: updatedStaff.user,
      });
  
      const refreshToken = await signRefreshJWToken({
        id: updatedStaff.id,
        email: updatedStaff.email,
        role: updatedStaff.user,
      });
  
      const encryptAccessToken = encryptToken(accessToken);
      const encryptRefreshToken = encryptToken(refreshToken);
  
      return {
        status: 201,
        message: "Updated Staff successfully!",
        accessToken: encryptAccessToken,
        refreshToken: encryptRefreshToken,
        staff: updatedStaff,
      } as ReturnRegisteredStaff;
    },
  
    // DElETE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteStaff: async (_, { emailInput }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { email: loginUserEmail, role } = user;
  
      // Authenticate user
      if (!user || loginUserEmail === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      // Authorize the user to be either a Staff or an Admin
      if (role !== 'Staff' && role !== 'Admin')
        throw new AuthenticationError("Not authorized!");
      const { email } = emailInput;
  
      // Validate Input field
      const validate = DelStaffInputSchema.validate(emailInput);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Error! Invalid staff ID!"
        );
  
      // Check if staff Already Exist
      const staffExist = await prisma.staff.findUnique({
        where: { email },
      });
  
      if (!staffExist) {
        throw new AuthenticationError("Staff doesn't exist!");
      }
  
      // Authorized Genuine Login User
      if (loginUserEmail !== email) {
        throw new AuthenticationError("Not authorized: not a genuine user!");
      }
  
      // Delete Staff
      const deletedStaff = await prisma.staff.delete({
        where: { email: loginUserEmail },
      });
      const { id: deletedId, firstName, lastName, staffID, title } = deletedStaff;
  
      return {
        status: 200,
        message: "Deleted Staff successfully!",
        id: deletedId,
        firstName,
        lastName,
        title,
        staffID,
      } as DeletedStaff;
    },
  };
  
  export default staffMutations;
