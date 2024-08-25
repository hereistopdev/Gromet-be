import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError, AnyObjectSchema } from "yup";

export const validatePayload =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query
      }, {abortEarly: false, stripUnknown: true});
      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          type: "ValidationError",
          message: err.message,
          errors: err.errors,
        });
      } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          type: "Server Error",
          message: "An unknown error occurred.",
        });
      }
    }
  };
