import { constant } from "../configs/constant.config";
import jwt, { JwtPayload } from "jsonwebtoken";

const { secretKey, expiresIn, refreshIn } = constant;

export const signAccessJWToken = async(payload: JwtPayload): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn: expiresIn }, (error, token) => {
      if (error) reject(error);
      resolve(token as string);
    });
  });
};

export const signRefreshJWToken = async (payload: JwtPayload): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
      { expiresIn: refreshIn },
      (error, token) => {
        if (error) reject(error);
        resolve(token as string);
      }
    );
  });
};

export const verifyAccessJWToken = async (token: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decode) => {
      if (error) reject(error);
      resolve(decode as string);
    });
  });
};

export const verifyRefreshJWToken = async (token: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decode) => {
      if (error) reject(error);
      resolve(decode as string);
    });
  });
};
