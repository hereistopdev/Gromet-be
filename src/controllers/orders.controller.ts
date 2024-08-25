import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../models/order";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      res.json({ errorMsg: "No Article" });
    }
    res.json({ orders: orders });
  } catch (error) {
    res.json({ error: error });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      res.json({ errorMsg: "No Article" });
    }
    res.json({ order: order });
  } catch (error) {
    res.json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  console.log("create order", req.body);
  const { email } = req.body;
  const uniqueId: string = uuidv4();
  let response: any[] = [];
  try {
    await req.body.map((item: any) => {
      const order = new Order({ ...item, createdBy: email, id: uniqueId });
      order.save();
      response.push(order);
    });
    return res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existedOrder = await Order.findOne({ id: id });
    if (existedOrder && id !== id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorMsg: "Same ID is already existed",
      });
    }
    await Order.findOneAndUpdate(
      { id: id },
      {
        id: id,
        author: req.body.email,
        status: req.body.status,
        title: req.body.title,
      }
    );
    return res.status(StatusCodes.OK).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Order.findOneAndDelete({ id: id });
    return res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteOrders = async (req: Request, res: Response) => {
  const ids = <string>req.query.ids || "";
  console.log(ids, "===", ids.split(","));
  try {
    for (const id of ids.split(",")) {
      console.log("id=> ", id);
      await Order.findOneAndDelete({ id: id });
    }
    res.status(StatusCodes.OK).send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const approve = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email !== "moonN@email.com") {
    return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not Acceptable");
  }
  const ids = <string>req.query.ids || "";
  try {
    for (const id of ids.split(",")) {
      await Order.findOneAndUpdate({ id: id }, { status: "Approved" });
    }
    res.status(StatusCodes.OK).send("Approve Successfully");
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const ordersController = {
  getOrders,
  getOrderById,
  create,
  update,
  deleteOrder,
  deleteOrders,
  approve,
};

export default ordersController;
