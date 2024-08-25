import { Request, Response } from "express";
import Cart from "../models/cart";
import { StatusCodes } from "http-status-codes";
import Product from "../models/product";
import User from "../models/user";
import { sendEmail } from "../utils/sendEmail";

import {
  secretKey,
  appname,
  frontendBaseUrl,
  frontendBaseVerificationUrl,
} from "../config";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const all_users = await User.find();
    return res.status(StatusCodes.OK).json({ data: all_users });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.query.user });
    return res.status(StatusCodes.OK).json({ data: user });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const DeleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await Cart.deleteMany({ roles: "USER" });
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const DeleteUserByID = async (req: Request, res: Response) => {
  try {
    const { selected } = req.body;
    console.log(selected);
    const result = await User.findOneAndDelete({
      email: selected,
    });
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const VerifyPhoneById = async (req: Request, res: Response) => {
  try {
    const { selected } = req.body;
    const result: any = await User.findOneAndUpdate(
      {
        email: selected,
      },
      { $set: { isPhoneVerified: true } },
      { new: true }
    );
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const VerifyEmailById = async (req: Request, res: Response) => {
  try {
    const { selected } = req.body;
    const user = await User.findOne({ email: selected });

    sendEmail({
      email: selected,
      subject: "Verification",
      template: "verificationEmailTemplate.ejs",
      compiledTemplateData: {
        appname: appname,
        verificationType: "signup",
        buttonName: "Verify",
        verifyurl: `${req.get("host")}${frontendBaseVerificationUrl}?id=${
          user?._id
        }`,
        actiontype: "verification",
        appbaseurl: frontendBaseUrl,
      },
    });
    return res.status(StatusCodes.OK).json({ data: "Sent" });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid input");
    }

    const result = await User.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found");
    }

    return res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const usersController = {
  DeleteAllUsers,
  getAllUsers,
  DeleteUserByID,
  VerifyPhoneById,
  VerifyEmailById,
  getUser,
  updateUser,
};

export default usersController;
