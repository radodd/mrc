import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
// Assuming you have a util file for Supabase interactions
import supabase from "../server";
import { schema, Product } from "../models/products";
import { PostgrestResponse } from "@supabase/supabase-js";
// import db from '../config/db';

// type SchemaType = 'products'

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.from("Product").select("*");
    // console.log("SUPA RESPONSE DATA ****", res);
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

// export const getProducts = async () => {
//   try {
//     const response = await fetch("/products"); // Assuming your backend endpoint is '/api/products'
//     if (!response.ok) {
//       throw new Error("Failed to fetch products");
//     }
//     const { data, error } = await response.json();
//     return data;
//   } catch (error: any) {
//     throw new Error("Failed to fetch products: " + error.message);
//   }
// };
