import { IReadStream } from "../interfaces/readstream.interface";
import generateUniqueFilename from "./genfilename.utils";
import { UserInputError } from "apollo-server-express";
import { envConfig } from "../configs/env.config";
import checkFileSize from "./checkfile.util";
import fileRemover from "./fileremove.util";
import { createWriteStream } from "fs";
import { config } from "dotenv";
import { join } from "path";

config();

const readStreamFile = async (args: IReadStream): Promise<string> => {
  const { file, action, subpath, oldImgURL } = args;
  const { port, dev, url } = envConfig;
  const { createReadStream, mimetype: t } = await file;

  // Check ImageType
  if (t !== "image/jpeg" && t !== "image/png" && t !== "image/jpg") {
    throw new UserInputError("Invalid image file uploaded!");
  }

  // Check File size is not more than 1MB
  try {
    const oneMB: number = 1000000; // 1MB
    await checkFileSize(createReadStream, oneMB);
  } catch (error) {
    if (typeof error === "number") {
      throw new UserInputError("Maximum file size is 1MB!");
    }
  }

  const stream = createReadStream();
  const unqueFilename = generateUniqueFilename(subpath);
  const pathname = join(
    __dirname,
    `../../public/upload/${subpath}/${unqueFilename}`
  );
  let URL: string = "";
  // DELETE AND UPDATE USER IMAGE
  if (action === "update" && oldImgURL !== "") {
    const imgURL = oldImgURL?.split("/");
    const lastIdx = imgURL?.length - 1;
    const filepath = imgURL[lastIdx];
    const isRemoved = await fileRemover({filepath, subpath});
    // If file is successfully deleted, then update!
    if (isRemoved) {
      const UPDATED_URL = `/${subpath}/${unqueFilename}`;
      const imageStream = createWriteStream(pathname);
      stream.pipe(imageStream);
      URL = UPDATED_URL;
    }
  } else {
    const CREATED_URL = `/${subpath}/${unqueFilename}`;
    const imageStream = createWriteStream(pathname);
    stream.pipe(imageStream);
    URL = CREATED_URL;
  }

  return URL;
};

export default readStreamFile;
