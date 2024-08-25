import * as yup from "yup";
import { validationMessages } from "../constants/validationMessages";

const signinSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email(validationMessages.email)
      .required(validationMessages.required("Email")),
    password: yup
      .string()
      .min(6, validationMessages.password.min)
      .max(255, validationMessages.password.max)
      .required(validationMessages.required("Password")),
  })
});

export default signinSchema;