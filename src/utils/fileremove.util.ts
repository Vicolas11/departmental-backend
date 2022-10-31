import IFileRemover from "../interfaces/fileremove.interface";
import { unlink } from "fs";
import { join } from "path";

const fileRemover = async (args: IFileRemover): Promise<boolean> => {
  const { filepath, subpath } = args;
  return new Promise<boolean>((resolve, reject) => {
    try {
      const path = join(__dirname, "../..", "public/upload", subpath, filepath);
      unlink(path, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    } catch (err) {
      const error = Error(`Error occurred while deleting! ${err}`);
      error["statusCode"] = 400;
      throw error;
    }
  });
};

export default fileRemover;
