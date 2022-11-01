import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredStaff } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { encryptToken } from "../../../utils/crypto.utils";
import { StaffLoginInputSchema } from "../../../joi/login.joi";

// Amode Oluwatamilore Sci17csc042 input your code below
const staffLogin: QueryResolvers = {
    loginStaff: async (_, { loginInput: input }, { prisma }) => {
      const { email, password: pwd } = input;
  
      // Validate Input field
      const validate = StaffLoginInputSchema.validate(input);
      const { error } = validate;
  
      if (error)
        throw new ValidationError(
          (error?.details?.map((err) => err.message) as unknown as string) ||
            "Validation Error!"
        );
  
      // Verify User and it's Role
      const staff = await prisma.staff.findUnique({ where: { email } });
      if (!staff) throw new AuthenticationError("Staff doesn't exist!");
      if (staff.user !== "Staff")
        throw new AuthenticationError("Invalid user type!");
  
      // Verify Password
      const hashPwd = staff.password;
      const hasMatched = await validatePassword({ pwd, hashPwd });
      if (!hasMatched) throw new AuthenticationError("Invalid Password!");
  
      // Generate Access and Refreshed Token
      const accessToken = await signAccessJWToken({
        id: staff.id,
        email: staff.email,
        role: staff.user,
      });
  
      const refreshToken = await signRefreshJWToken({
        id: staff.id,
        email: staff.email,
        role: staff.user,
      });
  
      // Remove Password field for security reasons
      Reflect.deleteProperty(staff, "password");
  
      const encryptAccessToken = encryptToken(accessToken);
      const encryptRefreshToken = encryptToken(refreshToken);
  
      console.log(encryptAccessToken);
  
      return {
        status: 201,
        message: "Login successfully!",
        accessToken: encryptAccessToken,
        refreshToken: encryptRefreshToken,
        staff
      } as ReturnRegisteredStaff;
    },
  };
  
  export default staffLogin;
  
