import * as yup from "yup";
import { validationMessages } from "../constants/validationMessages";

const verifyItemByEmailSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email(validationMessages.email)
      .required(validationMessages.required("Email")),
  }),
});

export default verifyItemByEmailSchema;