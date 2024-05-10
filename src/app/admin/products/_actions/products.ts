"use server";
import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/db/db";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

// The validation for adding a new instance
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  // categories: z.string().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  console.log(formData);
  // Use fs to save image file to the file system before saving the image path in order to save the downloadable content
  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      // categories: data.categories,
      imagePath,
    },
  });
  redirect("/admin/products");
}
