"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)(),
    DATABASE_URL: (0, validators_1.str)(),
    SUPABASE_API_KEY: (0, validators_1.str)(),
    //   SESSION_SECRET: str(),
});
