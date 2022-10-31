import { Secret } from "jsonwebtoken";

export interface IConstant {
  accessToken: Secret;
  refreshToken: Secret;
  cryptoSecretKey: string;
  cipherSecretKey: string;
  secretKey: string;
  expiresIn: string;
  refreshIn: string;
}
