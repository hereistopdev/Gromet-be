import {Router} from "express";
import articlesController from "../controllers/articles.controller";

import {verifyToken} from "../middlewares/auth.middleware";


const articlesRoute: Router = Router();

articlesRoute.get("/all", verifyToken, articlesController.getArticles);

export default articlesRoute;
