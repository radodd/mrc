import app from "./app";
import "dotenv/config";
import env from "./util/validateEnv";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const port = env.PORT;
const supabaseUrl = env.DATABASE_URL;
const supabaseKey = env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// console.log("SUPABASE ******", supabase);
export default supabase;

app.listen(port, () => {
  console.log("Supabase connected");
  console.log("Server running on port: " + port);
});
