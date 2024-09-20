"use strict";
// import express from "express";
// import * as ProductsController from "../controllers/products.js";
// @ts-ignore
const express = require("express");
//@ts-ignore
const ProductsController = require("../controllers/products");
// @ts-ignore
const router = express.Router();
router.get("/", ProductsController.getProducts);
router.get("/:productId", ProductsController.getProduct);
router.post("/", ProductsController.createProduct);
module.exports = router;
