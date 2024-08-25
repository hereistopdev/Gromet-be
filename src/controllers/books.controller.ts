import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Book from '../models/book';

const getByPage = async (req: Request, res: Response) => {
  const { email } = req.body;
  const title = <string>req.query.title || '';
  const page = parseInt(<string>req.query.page);
  const pageSize = parseInt(<string>req.query.pageSize);
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;
  let books;
  if (email === 'moonN@email.com') {
    books = await Book.find({ status: { $ne: 'Draft' } });
  } else {
    books = await Book.find({ createdBy: email });
  }
  const filteredBooks = books.filter((book) => book.title.includes(title))
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalCount = filteredBooks.length;
  return res.status(StatusCodes.OK).json({paginatedBooks, totalCount});
}

const create = async (req: Request, res: Response) => {
  const { id, email } = req.body;
  try {
    const existedBook = await Book.findOne({id: id})
    if (existedBook) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorMsg: "book is already existed"
      });
    } else {
      const book = new Book(
        {...req.body, createdBy: email}
      );
      await book.save();
      return res.status(StatusCodes.CREATED).json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existedBook = await Book.findOne({id: req.body.id})
    if (existedBook && id !== req.body.id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorMsg: "Same ID is already existed"
      });
    }
    await Book.findOneAndUpdate(
      {id: id},
      {
        id: req.body.id,
        title: req.body.title,
        status: req.body.status,
        cover: req.body.cover,
        pdf: req.body.pdf,
        author: req.body.email
      }
    );
    return res.status(StatusCodes.OK).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.findOneAndDelete({id: id});
    return res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const deleteBooks = async (req: Request, res: Response) => {
  const ids = <string>req.query.ids || '';
  console.log(ids, "===", ids.split(','))
  try {
    for ( const id of ids.split(',') ) {
      console.log("id=> ", id);
      await Book.findOneAndDelete({id: id});
    }
    res.status(StatusCodes.OK).send("Delete Successfully");
  }
  catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const approveBooks = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== 'moonN@email.com') {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable")
  }
  const ids = <string>req.query.ids || '';
  try {
    for ( const id of ids.split(',') ) {
      await Book.findOneAndUpdate({id: id}, {status: 'Published'});
    }
    res.status(StatusCodes.OK).send("Approve Successfully");
  }
  catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const rejectBooks = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== 'moonN@email.com') {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable")
  }
  const ids = <string>req.query.ids || '';
  try {
    for ( const id of ids.split(',') ) {
      console.log(id);
      await Book.findOneAndUpdate({id: id}, {status: 'Rejected'});
    }
    res.status(StatusCodes.OK).send("Reject Successfully");
  }
  catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const publishedBooksByMonth = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== 'moonN@email.com') {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable")
  }
  try {
    const aggregatedData = await Book.aggregate([
      {
        $match: {
          status: 'Published', // Replace 'published' with your desired status value
        },
      },
      {
        $project: {
          author: '$author',
          year: { $year: '$updatedAt' },
          month: { $month: '$updatedAt' },
        },
      },
      {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            author: '$author'
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.author': 1, '_id.year': 1, '_id.month': 1 },
      },
    ]);
    res.status(StatusCodes.OK).json(aggregatedData);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
}

const publishedBooksByDaily = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== 'moonN@email.com') {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable")
  }
  try {
    const aggregatedData = await Book.aggregate([
      {
        $match: {
          status: 'Published', // Replace 'published' with your desired status value
        },
      },
      {
        $project: {
          author: '$author',
          year: { $year: '$updatedAt' },
          month: { $month: '$updatedAt' },
          day: { $dayOfMonth: '$updatedAt'}
        },
      },
      {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            day: '$day',
            author: '$author'
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.author': 1, '_id.year': 1, '_id.month': 1, '_id.day': 1  },
      },
    ]);
    res.status(StatusCodes.OK).json(aggregatedData);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
}


const booksController = {
  create,
  update,
  deleteBook,
  getByPage,
  deleteBooks,
  approveBooks,
  rejectBooks,
  publishedBooksByMonth,
  publishedBooksByDaily
}

export default booksController;