import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import usersController from "../controllers/users.controller";

const usersRoute: Router = Router();

usersRoute.get("/DeleteAllUsers", verifyToken, usersController.DeleteAllUsers);

usersRoute.get("/getAllUsers", verifyToken, usersController.getAllUsers);
usersRoute.post("/DeleteUserByID", verifyToken, usersController.DeleteUserByID);
usersRoute.get("/getUser", verifyToken, usersController.getUser);
usersRoute.post("/updateUser", verifyToken, usersController.updateUser);
usersRoute.post(
  "/VerifyPhoneById",
  verifyToken,
  usersController.VerifyPhoneById
);
usersRoute.post(
  "/VerifyEmailById",
  verifyToken,
  usersController.VerifyEmailById
);

export default usersRoute;
