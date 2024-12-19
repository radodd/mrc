import { createClient } from "@supabase/supabase-js";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and API Key must be set in environment variables"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getMaterials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("getMaterials called");

    const { data, error } = await supabase.from("Materials").select(`
    id,
    name,
    description,
    color,
    uses,
    texture,
    company,
    imagePath,
    imagePrimary,
    MaterialCategories (
      id,
      category_id,
      Categories (
        id,
        name
      ),
      MaterialCategorySizes (
        id,
        size_id,
        Sizes (
          id,
          sizeValue
        )
      )
    )
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

// export const getMaterial = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { name } = req.params; // Extract the material ID from the route parameters

//   try {
//     console.log(`getMaterialById called for ID: ${name}`);

//     // Query to fetch material details along with its categories and sizes
//     const { data, error } = await supabase
//       .from("Materials")
//       .select(
//         `
//     id,
//     name,
//     description,
//     color,
//     uses,
//     texture,
//     company,
//     imagePath,
//     imagePrimary,
//     MaterialCategories (
//       id,
//       category_id,
//       Categories (
//         id,
//         name
//       ),
//       MaterialCategorySizes (
//         id,
//         size_id,
//         Sizes (
//           id,
//           sizeValue
//         )
//       )
//     )
//     `
//       )
//       // .eq("id", id);
//       .ilike("name", `%${name}%`);

//     if (error) {
//       console.error("Error fetching material by ID:", error);
//       throw createHttpError(500, "Failed to fetch material details");
//     }

//     if (!data || data.length === 0) {
//       throw createHttpError(404, `Material with ID ${name} not found`);
//     }

//     console.log("Material details fetched successfully:", data);
//     res.status(200).json(data[0]); // Return the first item since IDs are unique
//   } catch (error) {
//     console.error("Error in getMaterialById:", error);
//     next(error); // Pass error to the global error handler
//   }
// };
export const getMaterialById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Query to fetch material details by ID
    const { data, error } = await supabase
      .from("Materials")
      .select(
        `
        id,
        name,
        description,
        color,
        uses,
        texture,
        company,
        imagePath,
        imagePrimary,
        MaterialCategories (
          id,
          category_id,
          Categories (
            id,
            name
          ),
          MaterialCategorySizes (
            id,
            size_id,
            Sizes (
              id,
              sizeValue
            )
          )
        )
      `
      )
      .eq("id", id); // Use .eq to search by ID

    if (error) {
      console.error("Error fetching material by ID:", error);
      throw createHttpError(500, "Failed to fetch material details");
    }

    if (!data || data.length === 0) {
      throw createHttpError(404, `Material with ID ${id} not found`);
    }

    console.log("Material details fetched successfully:", data);
    res.status(200).json(data[0]); // Return the first item since IDs are unique
  } catch (error) {
    console.error("Error in getMaterialById:", error);
    next(error); // Pass error to the global error handler
  }
};

export const getMaterialByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.query; // Get the material name from query parameters
  console.log("Received name parameter:", name);

  try {
    if (!name || typeof name !== "string") {
      throw createHttpError(
        400,
        "Material name is required and must be a string"
      );
    }

    console.log(`getMaterialsByName called for Name: ${name}`);

    // Query to fetch material details by name
    const { data, error } = await supabase
      .from("Materials")
      .select(
        `
        id,
        name,
        description,
        color,
        uses,
        texture,
        company,
        imagePath,
        imagePrimary,
        MaterialCategories (
          id,
          category_id,
          Categories (
            id,
            name
          ),
          MaterialCategorySizes (
            id,
            size_id,
            Sizes (
              id,
              sizeValue
            )
          )
        )
      `
      )
      .ilike("name", `%${name}%`); // Use .ilike to search by name (case-insensitive)

    if (error) {
      console.error("Error fetching material by name:", error);
      throw createHttpError(500, "Failed to fetch material details");
    }

    if (!data || data.length === 0) {
      throw createHttpError(404, `Material with name ${name} not found`);
    }

    console.log("Material details fetched successfully:", data);
    res.status(200).json(data[0]); // Return the first matched item
  } catch (error) {
    console.error("Error in getMaterialsByName:", error);
    next(error); // Pass error to the global error handler
  }
};
