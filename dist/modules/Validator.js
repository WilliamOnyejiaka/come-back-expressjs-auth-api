"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Validator {
    constructor() { }
    emailValidator(email) {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }
    validateBody(requestBody, neededAttributes) {
        if (neededAttributes.length > 1) {
            for (let attr of neededAttributes) {
                if (!requestBody[attr]) {
                    return {
                        error: true,
                        message: "all values needed",
                        "missing value": attr,
                    };
                }
            }
        }
        else {
            if (!requestBody[neededAttributes[0]]) {
                return {
                    error: true,
                    message: `${neededAttributes[0]} needed`,
                    "missing value": neededAttributes[0],
                };
            }
        }
        return requestBody;
    }
    validateToken(token, type, tokenSecret) {
        let result = {};
        jsonwebtoken_1.default.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                result = {
                    error: true,
                    decodingError: err
                };
            }
            else if (decoded.type === type) {
                result = {
                    error: false,
                    decoded: decoded
                };
            }
            else {
                result = {
                    error: true,
                    typeError: `${type} token needed`,
                };
            }
        });
        return result;
    }
}
exports.default = Validator;
