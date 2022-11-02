import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword, validatePassword } from "../../utils/hashedPwd.util";
import { ChangePswResponse, MutationResolvers } from "../generated";
import { changePswInputSchema } from "../../joi/password.joi";
import { decryptToken } from "../../utils/crypto.utils";
import getUser from "../../utils/getuser.util";

// Ogungbola Emmanuel O. Sci17csc110 input your code here
const changePswMutation: MutationResolvers = {
    changePassword: async (_, { input }, { prisma, auth }) => {
      const token = decryptToken(auth) as string;
      const user = getUser(token);
      const { id: loginUserId, role } = user;
  
      // Authenticate user
      if (!user || loginUserId === '' || role === '')
        throw new AuthenticationError("User not authenticated!");
  
      const { password: pwd, new_password, id: userId } = input;
  
      // Form Validation
      const validate = changePswInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
      
      const loginUserRole = role.toLowerCase();
  
      // Check if Email Already Exist
      const userExist = await prisma[loginUserRole].findUnique({
        where: { id: userId },
      });
      
      if (!userExist)
        throw new AuthenticationError("This user those not exist!");
      
       // Authorized Genuine Login User
      if (loginUserId !== userId)
        throw new AuthenticationError("Not authorized: not a genuine user!");
  
      // Change Password
      const hashPwd: string = userExist.password;
  
      // Validate current password with that of the database
      const isMatched = await validatePassword({ pwd, hashPwd });
  
      if (!isMatched) throw new AuthenticationError("Password doesn't matched!");
  
      // Hashed and Replaced New Password Input
      const hashNewPwd = await hashPassword(new_password);
  
      const newPassword = await prisma[loginUserRole].update({
        where: { id: loginUserId },
        data: { password: hashNewPwd },
      });
  
      return {
        status: newPassword ? 200 : 500,
        message: newPassword
          ? "Password changed sucessfully!"
          : "An error occurred!",
      } as ChangePswResponse;
    },
  };
  
  export default changePswMutation;
