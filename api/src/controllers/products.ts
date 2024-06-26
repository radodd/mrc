import { Request, Response, NextFunction, RequestHandler } from "express";
// import {
//   Request,
//   Response,
//   NextFunction,
//   RequestHandler,
// } from "express-serve-static-core";

import createHttpError from "http-errors";
import supabase from "../server";
import { PostgrestResponse } from "@supabase/supabase-js";

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) {
      throw createHttpError(500, "Failed to fetch products");
    }
    if (!data) {
      throw createHttpError(404, "No products found");
    }
    console.log("DATA", data);
    res.json(data);
  } catch (error) {
    next();
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

export const createProduct: RequestHandler<
  unknown,
  unknown,
  CreateProductBody,
  unknown
> = async (req, res, next) => {
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

export const getProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    // Validate product ID
    if (!productId) {
      throw createHttpError(400, "Invalid product ID");
    }

    // Fetch product from Supabase
    const { data: product, error } = await supabase
      .from("Product")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      throw createHttpError(404, "Product not found");
    }

    // Respond with the product data
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
