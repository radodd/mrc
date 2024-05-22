import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URL: str(),
  SUPABASE_API_KEY: str(),

  //   SESSION_SECRET: str(),
});
