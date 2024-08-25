import { configDotenv } from "dotenv";
import constants from "../constant";

configDotenv();

export const port = constants.PORT;
export const mongoURI =
  constants.MONGODB_URI || "dbpath";

export const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
export const appname = constants.APPNAME || "Gromet";
export const frontendBaseVerificationUrl =
  constants.BASE_CLIENT_USER_EMAIL_VERIFICATION_URL || "";
export const frontendBaseUrl = constants.BASE_CLIENT_URL || "";
