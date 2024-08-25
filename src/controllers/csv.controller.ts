import { Request, Response } from "express";
const csvWriter = require('csv-writer');
import { StatusCodes } from "http-status-codes";
import path from "path";


const writer = (fileName: string,  dataHeaders: string[]) => csvWriter.createObjectCsvWriter({
  path: path.resolve('./public/data/uploads/csv', `${fileName}.csv`),
  header: dataHeaders.map((header) => ({ id: header, title: header }))
});

const exportCsvFile = async (req: Request, res: Response) => {
  const {data, fileName} = req.body;
  const dataHeaders = Object.getOwnPropertyNames(data[0]);

  dataHeaders.map((header) => ({ key: header, header: header }));
  writer(fileName, dataHeaders).writeRecords(data).then(() => {
    console.log('Done!');
  });

  return res.status(StatusCodes.CREATED);
};

const CsvController = {
  exportCsvFile
}

export default CsvController;