"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("../config/config"));
const controllers_1 = require("./../controllers/controllers");
const middleware_1 = require("./../middleware/middleware");
const auth = (0, express_1.Router)();
const authController = new controllers_1.Authentication();
auth.post("/sign-up", (0, middleware_1.validateBody)(['name', 'email', 'password']), authController.signUp);
auth.get("/login", middleware_1.getBasicAuthHeader, authController.login);
auth.get("/access-token", (0, middleware_1.validateJWT)(["refresh", (0, config_1.default)('REFRESH_TOKEN_SECRET')]), authController.getAccessToken);
exports.default = auth;
