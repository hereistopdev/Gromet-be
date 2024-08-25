import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const cartRoute: Router = Router();

cartRoute.post("/createCart", verifyToken, cartController.createCart);
cartRoute.post("/SetOrderByID", verifyToken, cartController.SetOrderByID);
cartRoute.post("/ProveOrderByID", verifyToken, cartController.ProveOrderByID);
cartRoute.post("/DeleteCartrByID", verifyToken, cartController.DeleteCartrByID);
cartRoute.get("/DeleteAllCarts", verifyToken, cartController.DeleteAllCarts);
cartRoute.get("/getAllCarts", verifyToken, cartController.getAllCarts);
cartRoute.get(
  "/getAllCartsWithID",
  verifyToken,
  cartController.getAllCartsWithID
);
cartRoute.get(
  "/DeleteAllCartsByUser",
  verifyToken,
  cartController.DeleteAllCartsByUser
);
export default cartRoute;
