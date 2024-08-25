import mongoose, { Document, Schema, Model } from "mongoose";

export interface Cart extends Document {
  itemNum: string;
  user_id: string;
  count: Number;
  status: Number;
  // prodName: string;
  // prodCate: string;
  // unit: string;
  // salePrice: string;
}

export interface CartModel extends Model<Cart> {}

const cartSchema: Schema = new Schema(
  {
    itemNum: {
      ref: "Product",
      type: Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    // prodName: {
    //     type: String,
    //     required: true
    // },
    // prodCate: {
    //     type: String,
    //     required: true
    // },
    // unit: {
    //     type: String,
    //     required: true
    // },
    // salePrice: {
    //     type: String
    // },
  },
  { timestamps: true }
);

const Cart = mongoose.model<Cart, CartModel>("Cart", cartSchema);

export default Cart;
