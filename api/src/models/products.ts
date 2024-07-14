import { createClient, PostgrestResponse } from "@supabase/supabase-js";
// import supabase from "../server";

const schema = "public";
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  company: string;
  color: string[];
  category: string[];
}
export { schema, Product };
