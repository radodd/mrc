"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = validateEnv_1.default.PORT;
const supabaseUrl = validateEnv_1.default.DATABASE_URL;
const supabaseKey = validateEnv_1.default.SUPABASE_API_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// console.log("SUPABASE ******", supabase);
exports.default = supabase;
app_1.default.listen(port, () => {
    console.log("Supabase connected");
    console.log("Server running on port: " + port);
});
