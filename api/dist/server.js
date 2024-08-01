"use strict";
// // import app from "./app";
// import "dotenv/config";
// import env from "./util/validateEnv";
// // const env = require("./util/validateEnv.js");
// import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// dotenv.config();
// const port = env.PORT;
// const supabaseUrl = env.DATABASE_URL;
// const supabaseKey = env.SUPABASE_API_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
// export default supabase;
// (async () => {
//   const { default: app } = await import("./app.js");
//   // const { default: env } = await import("./util/validateEnv.js");
//   app.listen(port, () => {
//     console.log("Supabase connected");
//     console.log("Server running on port: " + port);
//   });
// })();
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const express = require("express");
// @ts-ignore
const app = require("./app");
const env = require("./util/validateEnv");
const { createClient } = require("@supabase/supabase-js");
const port = process.env.PORT;
const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
exports.supabase = supabase;
app.listen(port, () => {
    console.log("Supabase connected");
    console.log("Server running on port: " + port);
});
