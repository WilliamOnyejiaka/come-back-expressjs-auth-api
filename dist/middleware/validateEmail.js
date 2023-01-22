"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules/modules");
const validateEmail = (req, res, next) => {
    !(new modules_1.Validator()).emailValidator(req.body["email"])
        ? (() => res.status(400).json({
            error: true,
            message: "valid email needed",
        }))()
        : next();
};
exports.default = validateEmail;
