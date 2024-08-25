import { Request, Response, Router } from 'express';
import multer from 'multer';
import fileController from '../controllers/file.controller';
import excelController from '../controllers/excel.controller';
import csvController from "../controllers/csv.controller";

// const maxSize = 20 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single("file");

const filesRoute: Router = Router();

filesRoute.post(  "/upload", uploadFile, fileController.upload);

filesRoute.post("/csv", csvController.exportCsvFile);

filesRoute.post("/excel", excelController.exportExcelFile);

filesRoute.delete("/:name", async (req: Request, res: Response) => {
  await fileController.remove(req, res);
})


export default filesRoute;