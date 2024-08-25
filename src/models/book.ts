import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document{
  id: string,
  title: string,
  subtitle: string,
  status: string,
  description: string,
  categories: string,
  author: string,
  country: string,
  price: number,
  tags: string,
  cover: string,
  book: string,
  createdBy: string,
}

export interface IBookModel extends Model<IBook> {
}

const bookSchema: Schema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  book: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);

export default Book;
