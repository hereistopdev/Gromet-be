import {Router} from "express";
import { Request, Response } from 'express';
import ordersController from "../controllers/orders.controller";

import {verifyToken} from "../middlewares/auth.middleware";


const ordersRoute: Router = Router();

ordersRoute.get("/all", verifyToken, ordersController.getOrders);
ordersRoute.get("/:id", ordersController.getOrderById);

ordersRoute.post("", verifyToken, ordersController.create);
ordersRoute.put("/:id", verifyToken, async (req: Request, res: Response) => {
  await ordersController.update(req, res);
});
ordersRoute.delete("/:id", async (req: Request, res: Response) => {
  await ordersController.deleteOrder(req, res);
});

ordersRoute.delete("/bulk/byIDs", ordersController.deleteOrders);

ordersRoute.patch("/bulk/approve/byIDs", verifyToken, async (req: Request, res: Response) => {
  await ordersController.approve(req, res);
});

export default ordersRoute;
