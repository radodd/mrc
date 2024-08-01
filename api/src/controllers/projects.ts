// import { Request, Response, NextFunction, RequestHandler } from "express";
// import createHttpError from "http-errors";
// import supabase from "../server";
//@ts-ignore

const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.DATABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
const RequestHandler = require("express");
const createHttpError = require("http-errors");

// const supabase = require("../server");
//@ts-ignore
export const getProjects = async (req, res, next) => {
  try {
    // Fetch product from Supabase
    const { data: project, error } = await supabase
      .from("Projects")
      .select("*");

    if (error) {
      throw createHttpError(404, "Project not found");
    }

    // Respond with the product data
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
