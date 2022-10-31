import { DelStaffInputSchema, StaffInputSchema, UpdateStaffInputSchema } from "../../../joi/staff.joi";
import { DeletedStaff, MutationResolvers, ReturnRegisteredStaff } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

// Adeyemi Ayomide Adetumininu SCI17CSC018 input your code here

