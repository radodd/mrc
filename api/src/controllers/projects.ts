import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import supabase from "../server";

export const getProjects: RequestHandler = async (req, res, next) => {
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
