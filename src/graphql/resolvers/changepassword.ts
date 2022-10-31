import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword, validatePassword } from "../../utils/hashedPwd.util";
import { ChangePswResponse, MutationResolvers } from "../generated";
import { changePswInputSchema } from "../../joi/password.joi";
import { decryptToken } from "../../utils/crypto.utils";
import getUser from "../../utils/getuser.util";

// Ogungbola Emmanuel O. Sci17csc110 input your code here

