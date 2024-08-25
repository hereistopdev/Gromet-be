import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../config";
import { StatusCodes } from "http-status-codes";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send("No token provided");
  }
 
  jwt.verify(token, secretKey, (err, decoded: any) => {
    if (err) { 
      return res.status(StatusCodes.UNAUTHORIZED).json("Invalid Token");
    }
    // @ts-ignore
    req.body.user_id = decoded?.id;
    // console.log(decoded || "none");
    req.headers["Authorization"] = `Bearer ${token}`; 
    next();
  });
};
