import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Book from "../models/book";
import Product from "../models/product";
import { filterProducts } from "../utils/filterProducts";
import { extractCategories } from "../utils/extractCategories";

const getProductsByCategory = async (req: Request, res: Response) => {
  const { prodCategory, pageSize, currentPage } = req.query;
  try {
    const pageSizeNumber: number = parseInt(pageSize as string, 10);
    const currentPageNumber: number = parseInt(currentPage as string, 10);
    const startIndex: number = currentPageNumber * pageSizeNumber;
    const endIndex: number = (currentPageNumber + 1) * pageSizeNumber;
    const filterKeys: string[] = [
      "id",
      "name",
      "article_code_and_model",
      "unit_of_measure",
      "vp_price",
      "net_price",
      "rebate",
      "min_pack",
      "trans_pack",
      "stock",
    ];

    let productsFilteredByCategory: any;
    if (!prodCategory) {
      productsFilteredByCategory = await Product.find({});
    } else {
      const categoryQueries = extractCategories({
        prodCategory: prodCategory as string,
      });
      productsFilteredByCategory = await Product.find({ $or: categoryQueries });
    }

    const filteredProducts: any[] = filterProducts({
      data: productsFilteredByCategory,
      startIndex: startIndex,
      endIndex: endIndex,
      filterKeys: filterKeys,
    });

    res.status(StatusCodes.OK).json({ filteredProducts });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error.");
  }
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const productFilteredById = await Product.findById(productId.slice(3));
    res.status(StatusCodes.OK).json(productFilteredById);
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error.");
  }
};

const getByPage = async (req: Request, res: Response) => {
  const { email } = req.body;
  const title = <string>req.query.title || "";
  const page = parseInt(<string>req.query.page);
  const pageSize = parseInt(<string>req.query.pageSize);
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;
  let books;
  if (email === "moonN@email.com") {
    books = await Book.find({
      status: {
        $ne: "Draft",
      },
    });
  } else {
    books = await Book.find({ createdBy: email });
  }
  const filteredBooks = books.filter((book) => book.title.includes(title));
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalCount = filteredBooks.length;
  return res.status(StatusCodes.OK).json({ paginatedBooks, totalCount });
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const all_books = await Product.find();
    return res.status(StatusCodes.OK).json({ data: all_books });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const createProduct = async (req: Request, res: Response) => {
  const files: any = req.files;
  let imageurl = "";
  files.forEach((item: any) => {
    const fileName = item.filename.split(".").slice(0, -1).join(".");
    imageurl += fileName + ",";
  });

  try {
    const body = req.body;
    console.log(body.sifra_proizvoda, body.naziv_proizvoda_model);
    body.sifra_proizvoda = JSON.parse(body.sifra_proizvoda);
    body.naziv_proizvoda_model = JSON.parse(body.naziv_proizvoda_model);

    req.body.slike = imageurl.slice(0, imageurl.length - 1);
    const newProduct = await Product.create(body);
    return res.status(StatusCodes.CREATED).json({ data: newProduct });
  } catch (err) {
    console.log("ERROR", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const files: any = req.files;
  let imageurl = "";
  files.forEach((item: any) => {
    const fileName = item.filename.split(".").slice(0, -1).join(".");
    imageurl += fileName + ",";
  });

  try {
    const body = req.body;
    body.sifra_proizvoda = JSON.parse(body.sifra_proizvoda);
    body.naziv_proizvoda_model = JSON.parse(body.naziv_proizvoda_model);

    req.body.slike = imageurl.slice(0, imageurl.length - 1);
    console.log(body);
    const newProduct = await Product.findByIdAndUpdate(
      { _id: req.query.id },
      body
    );
    return res.status(StatusCodes.CREATED).json({ data: newProduct });
  } catch (err) {
    console.log("ERROR", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await Product.findOneAndDelete({ _id: id });
    return res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const getProductDetailsById = async (req: Request, res: Response) => {
  console.log("getproductdetialbyid", req.params.id);

  const { id } = req.params;
  try {
    const book = await Product.findOne({ _id: id });

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).send("Product Not found");
    }

    return res.status(StatusCodes.OK).json({ data: book });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const getNewProducts = async (req: Request, res: Response) => {
  const { itemCategory } = req.body.itemCategory;
  try {
    const filteredProducts = await Product.find({
      item_category: itemCategory,
    });
    if (!filteredProducts) {
      res.json({ errorMsg: "No item" });
    }
    res.json({ filteredProducts: filteredProducts });
  } catch (error) {
    res.json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  const { id, email } = req.body;
  try {
    const existedBook = await Book.findOne({ id: id });
    if (existedBook) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorMsg: "book is already existed" });
    } else {
      const book = new Book({
        ...req.body,
        createdBy: email,
      });
      await book.save();
      return res.status(StatusCodes.CREATED).json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existedBook = await Book.findOne({ id: req.body.id });
    if (existedBook && id !== req.body.id.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorMsg: "Same ID is already existed" });
    }
    await Book.findOneAndUpdate(
      {
        id: id,
      },
      {
        id: req.body.id,
        title: req.body.title,
        status: req.body.status,
        cover: req.body.cover,
        pdf: req.body.pdf,
        author: req.body.email,
      }
    );
    return res.status(StatusCodes.OK).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.findOneAndDelete({ id: id });
    return res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteBooks = async (req: Request, res: Response) => {
  const ids = <string>req.query.ids || "";
  console.log(ids, "===", ids.split(","));
  try {
    for (const id of ids.split(",")) {
      console.log("id=> ", id);
      await Book.findOneAndDelete({ id: id });
    }
    res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const approveBooks = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== "moonN@email.com") {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable");
  }
  const ids = <string>req.query.ids || "";
  try {
    for (const id of ids.split(",")) {
      await Book.findOneAndUpdate(
        {
          id: id,
        },
        { status: "Published" }
      );
    }
    res.status(StatusCodes.OK).send("Approve Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const rejectBooks = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== "moonN@email.com") {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable");
  }
  const ids = <string>req.query.ids || "";
  try {
    for (const id of ids.split(",")) {
      console.log(id);
      await Book.findOneAndUpdate(
        {
          id: id,
        },
        { status: "Rejected" }
      );
    }
    res.status(StatusCodes.OK).send("Reject Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const publishedBooksByMonth = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== "moonN@email.com") {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable");
  }
  try {
    const aggregatedData = await Book.aggregate([
      {
        $match: {
          status: "Published", // Replace 'published' with your desired status value
        },
      },
      {
        $project: {
          author: "$author",
          year: {
            $year: "$updatedAt",
          },
          month: {
            $month: "$updatedAt",
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            author: "$author",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.author": 1,
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    res.status(StatusCodes.OK).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const publishedBooksByDaily = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== "moonN@email.com") {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable");
  }
  try {
    const aggregatedData = await Book.aggregate([
      {
        $match: {
          status: "Published", // Replace 'published' with your desired status value
        },
      },
      {
        $project: {
          author: "$author",
          year: {
            $year: "$updatedAt",
          },
          month: {
            $month: "$updatedAt",
          },
          day: {
            $dayOfMonth: "$updatedAt",
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            day: "$day",
            author: "$author",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.author": 1,
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);
    res.status(StatusCodes.OK).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const productsController = {
  getProductsByCategory,
  getProductById,

  create,
  update,
  deleteBook,
  getByPage,
  deleteBooks,
  approveBooks,
  rejectBooks,
  publishedBooksByMonth,
  publishedBooksByDaily,
  getNewProducts,
  getAllProducts,
  getProductDetailsById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productsController;
