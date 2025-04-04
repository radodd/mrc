import { supabase } from "./supabase";

export async function getMaterialById(id: string) {
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
    `,
    )
    .eq("id", id)
    .single(); // You expect one material

  if (error || !data) {
    throw new Error(`Could not fetch material with ID ${id}`);
  }

  return data;
}
