"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules/modules");
const validateBody = (neededAttributes) => (req, res, next) => {
    const validationResponse = new modules_1.Validator().validateBody(req.body, neededAttributes);
    validationResponse["error"]
        ? (() => res.status(400).json(validationResponse))()
        : next();
};
exports.default = validateBody;
