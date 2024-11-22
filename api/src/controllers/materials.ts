// import { createClient } from "@supabase/supabase-js";
// import createHttpError from "http-errors";
// import { Request, Response, NextFunction } from "express";

// const supabaseUrl = process.env.SUPABASE_URL as string;
// const supabaseKey = process.env.SUPABASE_API_KEY as string;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error(
//     "Supabase URL and API Key must be set in environment variables"
//   );
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// export const getMaterials = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("getMaterials called");

//     const { data, error } = await supabase.from("Materials").select(`
//         id,
//         name,
//         description,
//         color,
//         texture,
//         company,
//         imagePath,
//         imagePrimary,
//         category:Categories(name)
//       `);

//     if (error) {
//       console.error("Error fetching materials:", error);
//       throw createHttpError(500, "Failed to fetch Materials");
//     }

//     if (!data || data.length === 0) {
//       throw createHttpError(404, "No Materials found");
//     }

//     console.log("Materials fetched successfully:", data);
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error in getMaterials:", error);
//     next(error); // Pass error to the global error handler
//   }
// };

// const { createClient } = require("@supabase/supabase-js");
// const createHttpError = require("http-errors");

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_API_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error(
//     "Supabase URL and API Key must be set in environment variables"
//   );
// }

// const supabase = createClient(supabaseUrl, supabaseKey);
// @ts-ignore
exports.getMaterials = async (req, res, next) => {
  try {
    console.log("getMaterials called");

    const { data, error } = await supabase.from("Materials").select(`
        id, 
        name, 
        description, 
        color, 
        texture, 
        company, 
        imagePath, 
        imagePrimary
      `);

    if (error) {
      console.error("Error fetching materials:", error);
      throw createHttpError(500, "Failed to fetch Materials");
    }

    if (!data || data.length === 0) {
      throw createHttpError(404, "No Materials found");
    }

    console.log("Materials fetched successfully:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getMaterials:", error);
    next(error); // Pass error to the global error handler
  }
};

// module.exports = { getMaterials };
