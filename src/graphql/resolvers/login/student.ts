import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredStudent } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { StudentLoginInputSchema } from "../../../joi/login.joi";
import { encryptToken } from "../../../utils/crypto.utils";

// Alfa ufedo Elijah SCI17CSC036 input your code here

