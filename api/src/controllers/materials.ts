import { createClient } from "@supabase/supabase-js";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

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
    const { data, error } = await supabase.from("Materials").select(`
    id,
    slug,
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
    console.log("Materials Data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getMaterials:", error);
    next(error);
  }
};

export const getMaterialBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params;

  try {
    const { data, error } = await supabase
      .from("Materials")
      .select(
        `
        id,
        slug,
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
      .eq("slug", slug);

    if (error) {
      console.error("Error fetching material by slug:", error);
      throw createHttpError(500, "Failed to fetch material details");
    }

    if (!data || data.length === 0) {
      throw createHttpError(404, `Material with slug ${slug} not found`);
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error("Error in getMaterialBySlug:", error);
    next(error);
  }
};
