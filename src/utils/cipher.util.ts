import { constant } from "../configs/constant.config";
import CryptoJS from "crypto-js";
import { config } from "dotenv";

config();

const JWTokenCipher = (JWToken: string): string => {
  const { cipherSecretKey } = constant;
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(JWToken, cipherSecretKey).toString();
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, cipherSecretKey);
  var originalToken = bytes.toString(CryptoJS.enc.Utf8);
  return originalToken;
};

export default JWTokenCipher;
