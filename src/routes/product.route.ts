import { Router } from "express";
import { Request, Response } from "express";

import productsController from "../controllers/products.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { validatePayload } from "../middlewares/payloadvalidator.middleware";
import { verifyItemByIdSchema } from "../validators";

import multer from "multer";
const productsRoute: Router = Router();

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "public/assets/products/");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve the original file extension
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

productsRoute.get("/", productsController.getProductsByCategory);
//
productsRoute.get(
  "/getProducts",
  verifyToken,
  productsController.getAllProducts
);

productsRoute.get("/product/:id", productsController.getProductById);

// productsRoute.get("/", verifyToken, productsController.getByPage);

productsRoute.get(
  "/getProducts/:id",
  [validatePayload(verifyItemByIdSchema), verifyToken],
  productsController.getProductDetailsById
);

//productsRoute.post("/count", verifyToken, productsController.setProductCount);

productsRoute.post(
  "/createProduct",
  verifyToken,
  upload.array("files", 10),
  productsController.createProduct
);
productsRoute.post(
  "/updateProduct",
  verifyToken,
  upload.array("files", 10),
  productsController.updateProduct
);

productsRoute.post(
  "/deleteProduct",
  verifyToken,
  productsController.deleteProduct
);

productsRoute.put("/:id", verifyToken, async (req: Request, res: Response) => {
  await productsController.update(req, res);
});

productsRoute.delete("/:id", async (req: Request, res: Response) => {
  await productsController.deleteBook(req, res);
});

productsRoute.delete("/bulk/byIDs", productsController.deleteBooks);

productsRoute.patch(
  "/bulk/approve/byIDs",
  verifyToken,
  async (req: Request, res: Response) => {
    await productsController.approveBooks(req, res);
  }
);

productsRoute.get(
  "/published-by-month",
  verifyToken,
  productsController.publishedBooksByMonth
);

productsRoute.get(
  "/published-by-daily",
  verifyToken,
  productsController.publishedBooksByDaily
);

productsRoute.patch(
  "/bulk/reject/byIDs",
  verifyToken,
  productsController.rejectBooks
);
export default productsRoute;
