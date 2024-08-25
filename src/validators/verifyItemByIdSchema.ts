import * as yup from "yup";
import { validationMessages } from "../constants/validationMessages";

const verifyItemByIdSchema = yup.object({
  query: yup.object({
    id: yup.string().trim().required(validationMessages.noIdProvided),
  }),
});

export default verifyItemByIdSchema;