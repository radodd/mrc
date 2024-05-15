"use server";
import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/db/db";
import { notFound, redirect } from "next/navigation";
import { Product } from "@prisma/client";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

// The validation for adding a new instance
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  company: z.string().min(1),
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

  const createdProduct = await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      company: data.company,
      // categories: data.categories,
      imagePath,
    },
  });
  console.log("ID", createdProduct.id)
  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  image: imageSchema.optional()
})

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product: Product | null = await db.product.findUnique({where: {id}})

  if (product === null) return notFound()

  let imagePath = product.imagePath
  if (data.image !== null && data.image !== undefined && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

 

  const createdProduct = await db.product.update({
    where: {id},
    data: {
      name: data.name,
      description: data.description,
      company: data.company,
      // categories: data.categories,
      imagePath,
    },
  });
  console.log("ID", createdProduct.id)
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product === null) return notFound();

  await fs.unlink(`public${product.imagePath}`)
}
