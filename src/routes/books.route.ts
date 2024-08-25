import { Router } from "express";
import { Request, Response } from 'express';

import booksController from "../controllers/books.controller";
import {verifyToken} from "../middlewares/auth.middleware";


const booksRoute: Router = Router();

booksRoute.get("/", verifyToken, booksController.getByPage);
booksRoute.post("/", verifyToken, booksController.create);
booksRoute.put("/:id", verifyToken, async (req: Request, res: Response) => {
  await booksController.update(req, res);
});
booksRoute.delete("/:id", async (req: Request, res: Response) => {
  await booksController.deleteBook(req, res);
});

booksRoute.delete("/bulk/byIDs", booksController.deleteBooks);

booksRoute.patch("/bulk/approve/byIDs", verifyToken, async (req: Request, res: Response) => {
  await booksController.approveBooks(req, res);
});

booksRoute.get("/published-by-month", verifyToken, booksController.publishedBooksByMonth);

booksRoute.get("/published-by-daily", verifyToken, booksController.publishedBooksByDaily);

booksRoute.patch("/bulk/reject/byIDs", verifyToken, booksController.rejectBooks);
export default booksRoute;