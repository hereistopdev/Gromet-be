import { Request, Response } from "express";
import Cart from "../models/cart";
import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

const createCart = async (req: Request, res: Response) => {
  try {
    const { itemNum, count, user_id } = req.body;

    const existingItem = await Cart.findOne({ itemNum, user_id });

    if (existingItem) {
      // Item exists, update the count
      existingItem.count = Number(existingItem.count) + Number(count);
      await existingItem.save();
      return res.status(StatusCodes.OK).json({ data: existingItem });
    } else {
      // Item does not exist, create a new one
      const newCart = await Cart.create(req.body);
      return res.status(StatusCodes.CREATED).json({ data: newCart });
    }
  } catch (err) {
    console.log("ERROR", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const getAllCarts = async (req: Request, res: Response) => {
  try {
    const all_carts = await Cart.find().populate("itemNum");
    return res.status(StatusCodes.OK).json({ data: all_carts });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const getAllCartsWithID = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await Cart.find({ user_id: body.user_id }).populate(
      "itemNum"
    );
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const DeleteAllCartsByUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const result = await Cart.deleteMany({ user_id: user_id });
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const DeleteAllCarts = async (req: Request, res: Response) => {
  try {
    const result = await Cart.deleteMany({});
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const SetOrderByID = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    const result = await Cart.findOneAndUpdate(
      {
        _id: product_id,
      },
      { $set: { status: 1 } },
      { new: true }
    );
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const ProveOrderByID = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    const result: any = await Cart.findOneAndUpdate(
      {
        _id: product_id,
      },
      { $set: { status: 2 } },
      { new: true }
    );
    const result1 = await Product.findOneAndUpdate(
      { _id: result.itemNum },
      { $inc: { count: -result.count } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const DeleteCartrByID = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    console.log(product_id);
    const result = await Cart.findOneAndDelete({
      _id: product_id,
    });
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const cartController = {
  createCart,
  getAllCarts,
  getAllCartsWithID,
  DeleteAllCartsByUser,
  SetOrderByID,
  DeleteCartrByID,
  ProveOrderByID,
  DeleteAllCarts,
};

export default cartController;
