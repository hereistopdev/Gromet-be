import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as fs from "fs";

const upload = async (req: Request, res: Response) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      fileName: req.file.originalname,
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log("fileUploadControllerErr=> ", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const remove = async (req: Request, res: Response) => {

  const directoryPath = "./public/data/uploads/";
  const fileName = req.params.name;

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
}

const fileController = {
  upload,
  remove
}

export default fileController;