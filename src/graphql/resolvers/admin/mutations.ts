import { DelAdminInputSchema, AdminInputSchema, UpdateAdminInputSchema } from "../../../joi/admin.joi";
import { DeletedAdmin, MutationResolvers, ReturnRegisteredAdmin } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const adminMutations: MutationResolvers = {
  // CREATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  admin: async (_, { registerInput: input }, { prisma }) => {
    const { email } = input;
    // Validate Input field
    const validate = AdminInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const adminExist = await prisma.admin.findUnique({
      where: { email },
    });

    if (adminExist)
      throw new AuthenticationError("Admin already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;

    // Create New admin User
    const adminData = {
      ...input,
      id: uuid(),
    };

    const newAdmin = await prisma.admin.create({
      data: adminData,
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newAdmin, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created Admin successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      admin: newAdmin,
    } as ReturnRegisteredAdmin;
  },

  // UPDATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//   updateAdmin: async (_, { updateInput: input }, { prisma, auth }) => {
//     const token = decryptToken(auth) as string;
//     const user = getUser(token);
//     const { email: loginUserEmail, role } = user;

//     // Authenticate user
//     if (!user || loginUserEmail === '' || role === '')
//       throw new AuthenticationError("User not authenticated!");

//     // Authorize the user to be either a admin or an Admin
//     if (role !== 'Admin' && role !== 'Admin')
//       throw new AuthenticationError("Not authorized!");

//     const { firstName, lastName, avatar, email } = input;

//     // Validate Input field
//     const validate = UpdateAdminInputSchema.validate(input);
//     const { error } = validate;

//     if (error)
//       throw new ValidationError(
//         (error?.details?.map((err) => err.message) as unknown as string) ||
//           "Validation Error!"
//       );

//     // Check if Email Already Exist
//     const adminExist = await prisma.admin.findUnique({
//       where: { email },
//     });

//     if (!adminExist) {
//       throw new AuthenticationError("Admin doesn't exist!");
//     }

//     // Authorized Genuine Login User
//     if (loginUserEmail !== email) {
//       throw new AuthenticationError("Not authorized: not a genuine user!");
//     }

//     // Update admin User
//     const updateAdminData = {
//       firstName,
//       lastName,
//       avatar,
//     };

//     const updatedAdmin = await prisma.admin.update({
//       where: { email: loginUserEmail },
//       data: updateAdminData,
//     });

//     // Generate Access and Refreshed Token
//     const accessToken = await signAccessJWToken({
//       id: updatedAdmin.id,
//       email: updatedAdmin.email,
//       role: updatedAdmin.user,
//     });

//     const refreshToken = await signRefreshJWToken({
//       id: updatedAdmin.id,
//       email: updatedAdmin.email,
//       role: updatedAdmin.user,
//     });

//     return {
//       status: 201,
//       message: "Updated Admin successfully!",
//       accessToken,
//       refreshToken,
//       admin: updatedAdmin,
//     } as ReturnRegisteredAdmin;
//   },

  // DElETE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//   deleteAdmin: async (_, { emailInput }, { prisma, auth }) => {
//     const token = decryptToken(auth) as string;
//     const user = getUser(token);
//     const { email: loginUserEmail, role } = user;

//     // Authenticate user
//     if (!user || loginUserEmail === '' || role === '')
//       throw new AuthenticationError("User not authenticated!");

//     // Authorize the user to be either a Admin or an Admin
//     if (role !== 'Admin' && role !== 'Admin')
//       throw new AuthenticationError("Not authorized!");
//     const { email } = emailInput;

//     // Validate Input field
//     const validate = DelAdminInputSchema.validate(emailInput);
//     const { error } = validate;

//     if (error)
//       throw new ValidationError(
//         (error?.details?.map((err) => err.message) as unknown as string) ||
//           "Error! Invalid admin ID!"
//       );

//     // Check if admin Already Exist
//     const adminExist = await prisma.admin.findUnique({
//       where: { email },
//     });

//     if (!adminExist) {
//       throw new AuthenticationError("Admin doesn't exist!");
//     }

//     // Authorized Genuine Login User
//     if (loginUserEmail !== email) {
//       throw new AuthenticationError("Not authorized: not a genuine user!");
//     }

//     // Delete Admin
//     const deletedAdmin = await prisma.admin.delete({
//       where: { email: loginUserEmail },
//     });
//     const { id: deletedId, firstName, lastName } = deletedAdmin;

//     return {
//       status: 200,
//       message: "Deleted Admin successfully!",
//       id: deletedId,
//       firstName,
//       lastName,
//     } as DeletedAdmin;
//   },
};

export default adminMutations;
