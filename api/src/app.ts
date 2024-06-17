// import express from "express";
import path from "path";
import cors from "cors";
import productsRoutes from "./routes/products";
import resendRouter from "./routes/resend";

const express  = require("express")
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const userRouter = require("./routes/users");

app.use("/users", userRouter);
app.use("/resend", resendRouter);
app.use("/products", productsRoutes);

export default app;
