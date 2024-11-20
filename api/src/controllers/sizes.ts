const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
// const { Response, NextFunction } = require("express");
// const Request = require("express");

const createHttpError = require("http-errors");

// @ts-ignore
exports.getSizes = async (req, res, next) => {
  try {
    console.log("getSizes called");
    const { data, error } = await supabase.from("Sizes").select(` id, 
    name, 
    material:Materials(name),
    category:Categories(name) `);
    console.log("THe Error", error);
    if (error) {
      throw createHttpError(500, "Failed to fetch Sizes");
    }
    if (!data) {
      throw createHttpError(404, "No Sizes found");
    }
    console.log("Sizes fetched", data);
    res.json(data);
  } catch (error) {
    console.error("Error in getSizes:", error);
    next(error);
  }
};
