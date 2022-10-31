import { signAccessJWToken, signRefreshJWToken } from "../src/utils/jwt.util";
import { decryptToken, encryptToken } from "../src/utils/crypto.utils";
import { hashPassword, validatePassword } from "../src/utils/hashedPwd.util";
import { PrismaClient } from "@prisma/client";
import logger from "../src/utils/logger.util";
import { v4 as uuid } from "uuid";
import { argv } from "process";
import Joi from "joi";

/**
 * This script is create to specially manage admins
 * @argument action <Action to perform on admin (create | update | delete)>
 * @argument name <Name of admin>
 * @argument email <Email of admin>
 * @argument password <Password of admin>
 */

(async () => {
  const prisma = new PrismaClient();

  console.log("\n⚙👷🏽‍♂️ MANAGE ADMIN \n\n");
  // index of arguments
  const actionIdx = argv.indexOf("action");
  const firstnameIdx = argv.indexOf("firstname");
  const lastnameIdx = argv.indexOf("lastname");
  const emailIdx = argv.indexOf("email");
  const passwordIdx = argv.indexOf("password");
  const newPasswordIdx = argv.indexOf("newpassword");
  const rePasswordIdx = argv.indexOf("repassword");

  // values of arguments
  const actionVal = argv[2];
  const firstNameVal = argv[firstnameIdx + 1];
  const lastNameVal = argv[lastnameIdx + 1];
  const emailVal = argv[emailIdx + 1];
  const passwordVal = argv[passwordIdx + 1];
  const newPasswordVal = argv[newPasswordIdx + 1];
  const rePasswordVal = argv[rePasswordIdx + 1];

  const actions = ["create", "update", "delete", "change_psd"];

  if (
    (actionVal !== "create" &&
      actionVal !== "update" &&
      actionVal !== "delete" &&
      actionVal !== "change_psd") ||
    !actionVal
  )
    return logger.error(`Provide a valid action. Use <${actions.join(" | ")}>`);

  // CREATE ADMIN
  if (actionVal === "create") {
    logger.info("ℹ Attempting to perform an admin CREATE action");
    if (firstnameIdx === -1 || !firstNameVal)
      return logger.error("Provide admin firstname. Use firstname <value>");
    if (lastnameIdx === -1 || !lastNameVal)
      return logger.error("Provide admin lastname. Use lastname <value>");
    if (emailIdx === -1 || !emailVal)
      return logger.error("Provide admin email. Use email <value>");
    if (passwordIdx === -1 || !passwordVal)
      return logger.error("Provide admin password. Use password <value>");

    const createAdminInputSchema = Joi.object({
      firstName: Joi.string().min(3).max(128).required(),
      lastName: Joi.string().min(3).max(128).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(15).required(),
    });

    const adminToCreate = {
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      password: passwordVal,
    };

    const validated = createAdminInputSchema.validate(adminToCreate);

    if (validated?.error?.details) {
      return logger.error("❗ Validation failed: ", validated.error.details);
    }

    try {
      const numAdmin = await prisma.admin.count();
      if (numAdmin > 0) return logger.error("❗ Only an admin can be created");

      const foundAdmin = await prisma.admin.findFirst({
        where: { email: emailVal },
      });
      if (foundAdmin) return logger.error("❗ Admin already exists");
      const newAdmin = {
        id: uuid(),
        ...adminToCreate,
      };
      const hashedPassword = await hashPassword(newAdmin.password);
      // replace new admin password with hashed password
      newAdmin.password = hashedPassword;
      // save admin to database
      const savedAdmin = await prisma.admin.create({
        data: newAdmin,
      });
      // hashed password should not be sent to client
      Reflect.deleteProperty(savedAdmin, "password");

      // sign a new access and refresh token for saved admin
      const accessToken = await signAccessJWToken({ adminId: savedAdmin.id });
      const refreshToken = await signRefreshJWToken({ adminId: savedAdmin.id });

      const encryptAccessToken = encryptToken(accessToken);
      const encryptRefreshToken = encryptToken(refreshToken);

      return logger.success(
        "✅ Admin created successfully: ",
        JSON.stringify({
          encryptAccessToken,
          encryptRefreshToken,
          admin: savedAdmin,
        })
      );
    } catch (err) {
      return logger.error("❌ Could not create admin: ", err);
    }
  }

  // UPDATE ADMIN
  if (actionVal === "update") {
    logger.info("ℹ Attempting to perform an admin UPDATE action");
    if (firstnameIdx === -1 || !firstNameVal)
      return logger.error("Provide admin firstname. Use firstname <value>");
    if (lastnameIdx === -1 || !lastNameVal)
      return logger.error("Provide admin lastname. Use lastname <value>");
    if (emailIdx === -1 || !emailVal)
      return logger.error("Provide admin email. Use email <value>");

    const updateAdminInputSchema = Joi.object({
      firstName: Joi.string().min(3).max(128).required(),
      lastName: Joi.string().min(3).max(128).required(),
      email: Joi.string().email().required(),
    });

    const adminToUpdate = {
      firstName: firstNameVal,
      lastName: lastNameVal,
    };

    const validated = updateAdminInputSchema.validate(adminToUpdate);

    if (validated?.error?.details) {
      return logger.error("❗ Validation failed: ", validated.error.details);
    }

    try {
      const foundAdmin = await prisma.admin.findFirst({
        where: { email: emailVal },
      });

      if (!foundAdmin) return logger.error("❗ Admin doesn't exists");

      const updateAdmin = {
        ...adminToUpdate,
      };

      // save admin to database
      const savedAdmin = await prisma.admin.update({
        where: { email: emailVal },
        data: updateAdmin,
      });

      // hashed password should not be sent to client
      Reflect.deleteProperty(savedAdmin, "password");

      // sign a new access and refresh token for saved admin
      const accessToken = await signAccessJWToken({ adminId: savedAdmin.id });
      const refreshToken = await signRefreshJWToken({ adminId: savedAdmin.id });

      const encryptAccessToken = encryptToken(accessToken);
      const encryptRefreshToken = encryptToken(refreshToken);

      return logger.success(
        "✅ Admin updated successfully: ",
        JSON.stringify({
          encryptAccessToken,
          encryptRefreshToken,
          admin: savedAdmin,
        })
      );
    } catch (err) {
      return logger.error("❌ Could not update admin: ", err);
    }
  }

  // DELETE ADMIN
  if (actionVal === "delete") {
    logger.info("ℹ Attempting to perform an admin DELETE action");

    if (emailIdx === -1 || !emailVal)
      return logger.error("Provide admin email. Use email <value>");

    const deleteAdminInputSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    const adminToDelete = {
      email: emailVal,
    };

    const validated = deleteAdminInputSchema.validate(adminToDelete);

    if (validated?.error?.details) {
      return logger.error("❗ Validation failed: ", validated.error.details);
    }

    try {
      const foundAdmin = await prisma.admin.findFirst({
        where: { email: emailVal },
      });

      if (!foundAdmin) return logger.error("❗ Admin doesn't exists");

      // save admin to database
      const savedAdmin = await prisma.admin.delete({
        where: { email: emailVal },
      });

      return logger.success(
        "✅ Admin deleted successfully: ",
        JSON.stringify({
          admin: savedAdmin,
        })
      );
    } catch (err) {
      return logger.error("❌ Could not delete admin: ", err);
    }
  }

  // UPDATE ADMIN PASSWORD
  if (actionVal === "change_psd") {
    logger.info("ℹ Attempting to perform an admin CHANGE_PSD action");

    if (emailIdx === -1 || !emailVal)
      return logger.error("Provide admin email. Use email <value>");

    if (passwordIdx === -1 || !passwordVal)
      return logger.error("Provide admin password. Use password <value>");

    if (newPasswordIdx === -1 || !newPasswordVal)
      return logger.error(
        "Provide admin new password. Use newpassword <value>"
      );

    if (rePasswordIdx === -1 || !rePasswordVal)
      return logger.error("Provide admin repassword. Use repassword <value>");

    const psdAdminInputSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required(),
      newpassword: Joi.string().min(6).max(15).required(),
      repassword: Joi.string().min(6).max(15).required(),
    }).with("newpassword", "repassword");

    const adminToChangePsd = {
      email: emailVal,
      password: passwordVal,
      newpassword: newPasswordVal,
      repassword: rePasswordVal,
    };

    const validated = psdAdminInputSchema.validate(adminToChangePsd);

    if (validated?.error?.details) {
      return logger.error("❗ Validation failed: ", validated.error.details);
    }

    try {
      const foundAdmin = await prisma.admin.findFirst({
        where: { email: emailVal },
      });

      if (!foundAdmin) return logger.error("❗ Admin doesn't exists");

      const currentAdminPsd = foundAdmin.password; // Is in a hash format
      const newHashedPsd = await hashPassword(newPasswordVal);

      const isMatched = await validatePassword({
        pwd: passwordVal,
        hashPwd: currentAdminPsd,
      });

      if (!isMatched) return logger.error("❌ Invalid password!");

      // save admin to database
      const savedAdmin = await prisma.admin.update({
        where: { email: emailVal },
        data: { password: newHashedPsd },
      });

      return logger.success(
        "✅ Admin password changed successfully: ",
        JSON.stringify({
          admin: savedAdmin,
        })
      );
    } catch (err) {
      return logger.error("❌ Could not change password: ", err);
    }
  }
})();
