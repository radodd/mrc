// import { Request, Response, NextFunction, RequestHandler } from "express";
// import {
//   Request,
//   Response,
//   NextFunction,
//   RequestHandler,
// } from "express-serve-static-core";

// import createHttpError from "http-errors";
// import supabase from "../server";

// const { Request, Response, NextFunction } = require("express");
// const RequestHandler = require("express").RequestHandler;
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
const { Response, NextFunction } = require("express");
const Request = require("express");

const createHttpError = require("http-errors");
// const supabase = require("../server.ts");
console.log("Supabase Client in PRODUCTS:", supabase);
// @ts-ignore
exports.getProducts = async (req, res, next) => {
  // export const getProducts: RequestHandler = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  try {
    console.log("getProducts called");
    const { data, error } = await supabase.from("Product").select("*");
    console.log("THe Error", error);
    if (error) {
      throw createHttpError(500, "Failed to fetch products");
    }
    if (!data) {
      throw createHttpError(404, "No products found");
    }
    console.log("Products fetched", data);
    res.json(data);
  } catch (error) {
    console.error("Error in getProducts:", error);
    next(error);
  }
};

interface CreateProductBody {
  name: number;
  description: string;
  imagePath: string;
  company: string;
  color: string[];
  category: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  company: string;
  image: string;
}
//@ts-ignore
export const createProduct = async (req, res, next) => {
  const { name, description, imagePath, company, color, category } = req.body;

  try {
    if (
      !name ||
      !description ||
      !imagePath ||
      !company ||
      !color.length ||
      !category.length
    ) {
      throw createHttpError(
        400,
        "All fields are required and must have at least one category and color"
      );
    }

    // Insert the product
    const { data, error: productError } = await supabase
      .from("Product")
      .insert([{ name, description, imagePath, company, color, category }])
      .select("*")
      .single();
    console.log("DATA", data);
    if (productError) {
      console.log(productError);
      throw createHttpError(500, "Failed to create product");
    }

    if (!data) {
      console.log("The Product:", data);
      throw createHttpError(500, "Product data is missing");
    }
    console.log("Product Data", data);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
//@ts-ignore
exports.getProduct = async (req, res, next: any) => {
  // const productId = parseInt(req.params.productId);
  const { id } = req.params;
  console.log("ID in getProduct:", id, typeof id);
  if (!id || isNaN(parseInt(id))) {
    return next(createHttpError(400, "Invalid or missing product ID"));
  }
  try {
    console.log("getProduct called");
    const productId = parseInt(id);
    console.log("ID in Server", productId);
    // Validate product ID
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .eq("id", productId)
      .single();

    // Fetch product from Supabase

    if (error) {
      console.error("Supabase error", error);
      throw createHttpError(404, "Product not found");
    }
    if (!data) {
      throw createHttpError(404, "Product not found");
    }

    // Respond with the product data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getProduct:", error);
    next(error);
  }
};
