"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules/modules");
const validateJWT = (tokenDetails, neededData = ['id']) => (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'Missing Bearer Authorization Header' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const validator = new modules_1.Validator();
    const tokenValidationResult = validator.validateToken(token, tokenDetails[0], tokenDetails[1]);
    if (tokenValidationResult.error === true) {
        if (tokenValidationResult.decodingError) {
            return res.status(400).json({
                error: true,
                message: tokenValidationResult.decodingError,
            });
        }
        if (tokenValidationResult.typeError) {
            return res.status(400).json({
                error: true,
                message: tokenValidationResult.typeError,
            });
        }
    }
    for (let item of neededData) {
        res.locals[item] = tokenValidationResult.decoded[item];
    }
    next();
};
exports.default = validateJWT;
