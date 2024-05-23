import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../server";

const schema = "public";
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  company: string;
}
export { schema, Product };

// Function to fetch all products
// export async function fetchProducts(): Promise<PostgrestResponse<Product>> {
//     return await supabase.from<Product>('products').select('*');
// }

// import { InferSchemaType, model, Schema } from "mongoose";

// const noteSchema = new Schema({
//     userId: { type: Schema.Types.ObjectId, required: true },
//     title: { type: String, required: true },
//     text: { type: String },
// }, { timestamps: true });

// type Note = InferSchemaType<typeof noteSchema>;

// export default model<Note>("Note", noteSchema);
