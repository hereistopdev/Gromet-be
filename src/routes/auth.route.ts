import { Router } from "express";
import { Request, Response } from "express";

import { verifyToken } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";
import { validatePayload } from "../middlewares/payloadvalidator.middleware";
import {
  signinSchema,
  signupSchema,
  verifyItemByIdSchema,
  verifyItemByEmailSchema,
} from "../validators";

const authRoute: Router = Router();

authRoute.post("/login", validatePayload(signinSchema), authController.login); //complete
authRoute.post("/signup", validatePayload(signupSchema), authController.signup); //complete
authRoute.get(
  "/verifyuserbyid",
  validatePayload(verifyItemByIdSchema),
  authController.verifyUserById
); //complete
authRoute.post("/forgot-password", authController.forgotPassword); //complete
authRoute.post("/password-reset", authController.resetPassword);
// authRoute.get("/me", verifyToken, async (req : Request, res : Response) => {
//     await authController.fetchMe(req, res);
// });

export default authRoute;
