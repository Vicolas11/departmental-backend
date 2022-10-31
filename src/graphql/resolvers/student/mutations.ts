import { DelStudentInputSchema, StudentInputSchema, UpdateStudentInputSchema } from "../../../joi/student.joi";
import { DeletedStudent, MutationResolvers, ReturnRegisteredStudent } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import titleCase from "../../../utils/titlecase.utl";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

// Yashim Gabriel SCI17CSC075

