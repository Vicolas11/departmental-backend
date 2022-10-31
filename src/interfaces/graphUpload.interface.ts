import { ReadStream } from "fs";

export interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(options?: {
    encoding?: string;
    highWaterMark?: number;
  }): ReadStream;
}