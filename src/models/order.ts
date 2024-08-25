import mongoose, { Document, Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IOrder extends Document {
  itemNum: string;
  prodCode: string;
  prodName: string;
  prodCate: string;
  unit: string;
  salePrice: string;
}

export interface IOrderModel extends Model<IOrder> {}

const orderSchema: Schema = new Schema(
  {
    id: { type: String, default: uuidv4 },
    unit: { type: String, required: true },
    prodCate: { type: String, required: true },
    prodName: { type: String, required: true },
    prodCode: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: String, required: true },
    itemNum: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder, IOrderModel>("Order", orderSchema);

export default Order;
