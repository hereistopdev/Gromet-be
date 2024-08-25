import express from "express";
import mongoose from "mongoose";
const helmet = require("helmet");
const compression = require("compression");
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { mongoURI, port } from "./config";
import router from "./routes";

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.log("mongooseErr=> ", err);
  });

const app = express();
const routes = router;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");
app.set("view engine", "ejs");

app.use(helmet());
app.use(compression());

const server = app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

export default server;
