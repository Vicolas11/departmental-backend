import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredStaff } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { encryptToken } from "../../../utils/crypto.utils";
import { StaffLoginInputSchema } from "../../../joi/login.joi";

// Amode Oluwatamilore Sci17csc042 input your code below

