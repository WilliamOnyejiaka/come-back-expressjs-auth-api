"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function envConfigs(key) {
    return {
        MONGODB_URI: process.env.MONGODB_URI,
        PORT: process.env.PORT,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    }[key];
}
exports.default = envConfigs;
