import Excel from 'exceljs';
import path from 'path';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const exportExcelFile = async (req: Request, res: Response) => {
  const {data, fileName} = req.body;
  const dataHeaders = Object.getOwnPropertyNames(data[0]);
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  worksheet.columns = dataHeaders.map((header) => ({ key: header, header: header }));

  data.forEach((item: any) => {
    worksheet.addRow(item);
  });

  const exportPath = path.resolve('./public/data/uploads/excel', `${fileName}.xlsx`);

  await workbook.xlsx.writeFile(exportPath);

  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.font = {
      size: 12,
    };
    sheetColumn.width = 30;
  });

  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };

  return res.status(StatusCodes.CREATED);
};

const excelController = {
  exportExcelFile
}

export default excelController;