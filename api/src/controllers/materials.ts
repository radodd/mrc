const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
// const { Response, NextFunction } = require("express");
// const Request = require("express");

const createHttpError = require("http-errors");

// @ts-ignore
exports.getMaterials = async (req, res, next) => {
  try {
    console.log("getMaterials called");
    const { data, error } = await supabase.from("Materials").select(` id, 
    name, 
    description, 
    color, 
    texture, 
    company,
    imagePath, 
    imagePrimary, 
    category:Categories(name) `);
    console.log("THe Error", error);
    if (error) {
      throw createHttpError(500, "Failed to fetch Materials");
    }
    if (!data) {
      throw createHttpError(404, "No Materials found");
    }
    console.log("Materials fetched", data);
    res.json(data);
  } catch (error) {
    console.error("Error in getMaterials:", error);
    next(error);
  }
};
