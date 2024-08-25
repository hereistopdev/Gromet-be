import { validationMessages } from "../constants/validationMessages";
const yup = require("yup");

const signupSchema = yup.object({
  body: yup.object({
    username: yup
      .string()
      .required(validationMessages.required("Username")),
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

export default signupSchema;