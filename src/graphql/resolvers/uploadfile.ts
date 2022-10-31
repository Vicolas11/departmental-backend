import { AuthenticationError, UserInputError, ValidationError } from "apollo-server-express";
import { FileInputSchema, FileUpdateInputSchema } from "../../joi/uploadfile.joi";
import { MutationResolvers, UploadResponse } from "../generated";
import readStreamFile from "../../utils/readStream.util";
import { decryptToken } from "../../utils/crypto.utils";
import deleteFile from "../../utils/deletefile.utils";
import getUser from "../../utils/getuser.util";

const uploadFileMutation: MutationResolvers = {
  // UPLOAD FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  uploadFile: async (_, { input }, _ctx) => {
    const { file, type } = input;

    // Validate Input field
    const validate = FileInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    const getFile = await input.file;
    if (!getFile) {
      throw new UserInputError("Uploaded an empty file!");
    }

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: "",
      action: "create",
      subpath: type,
    });

    return {
      message: "Successfully uploaded!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  // UPDATE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateFile: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, role } = user;

    // Authenticate user
    if (!user || loginUserId === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    const { file, id, type } = input;

    // Validate Input field
    const validate = FileUpdateInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    const loginUserRole = role.toLowerCase();
    const userExist = await prisma[loginUserRole].findUnique({
      where: { id: loginUserId },
    });
    const getFile = await file;

    if (!userExist) throw new AuthenticationError("User doen't exist!");

    if (!getFile) throw new AuthenticationError("Uploaded an empty file!");

    if (loginUserId !== id)
      throw new AuthenticationError("Not authorized: Not a genuine user!");

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: userExist?.avatar || "",
      action: "update",
      subpath: type,
    });

    return {
      message: "Image successfuly updated!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  // DELETE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteFile: async (_, { deleteInput: id }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, role } = user;

    // Authenticate user
    if (!user || loginUserId === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    const loginUserRole = role.toLowerCase();
    const userExist = await prisma[loginUserRole].findUnique({
      where: { id: loginUserId },
    });

    if (!userExist) throw new AuthenticationError("User doen't exist!");

    // Authorized user, if is Genuine
    if (loginUserId !== id)
      throw new AuthenticationError("Not authorized: Not a genuine user!");

    const isDeleted = await deleteFile(userExist?.avatar as string, true);
    const message = isDeleted
      ? "Image successfuly deleted!"
      : "Image deleting failed!";
    const status = isDeleted ? 200 : 500;

    return {
      message: message,
      imageUrl: userExist?.avatar,
      status: status,
    } as UploadResponse;
  },
};

export default uploadFileMutation;
