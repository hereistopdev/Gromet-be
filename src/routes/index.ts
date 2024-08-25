import { Router } from "express";

import authRoute from "./auth.route";
import filesRoute from "./files.route";
import booksRoute from "./books.route";
import productsRoute from "./product.route";
import articlesRoute from "./article.route";
import ordersRoute from "./order.route";
import cartRoute from "./cart.route";
import usersRoute from "./users.route";

const router = Router();

router.use("/account", authRoute);
router.use("/files", filesRoute);
router.use("/books", booksRoute);
router.use("/articles", articlesRoute);
router.use("/orders", ordersRoute);
router.use("/products", productsRoute);
router.use("/cart", cartRoute);
router.use("/users", usersRoute);

export default router;
