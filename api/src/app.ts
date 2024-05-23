// const express = require("express");
import express from "express";
import path from "path";
import cors from "cors";
import productsRoutes from "./routes/products";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.get("/", logger, (req: any, res: any) => {
//   res.send("Express on Vercel");
// });

const userRouter = require("./routes/users");

app.use("/users", userRouter);
app.use("/products", productsRoutes);

function logger(req: any, res: any, next: any) {
  console.log(req.originalUrl);
  next();
}

// app.listen(3030, () => console.log("Server ready on port 3030."));

export default app;
