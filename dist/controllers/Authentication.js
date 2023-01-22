"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./../modules/modules");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../models/Users"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const [name, email, password] = [
                req.body.name,
                req.body.email,
                req.body.password,
            ];
            const validator = new modules_1.Validator();
            if (password.length < 5) {
                return res.status(400).json({
                    error: true,
                    message: "password length must be greater than 4",
                });
            }
            if (!validator.emailValidator(email)) {
                return res.status(400).json({
                    error: true,
                    message: "email is not valid"
                });
            }
            const emailExits = yield Users_1.default.findOne({ email: email });
            if (!emailExits) {
                const passwordHash = yield bcrypt_1.default.hash(password, 10);
                const user = new Users_1.default({
                    name: name,
                    email: email,
                    password: passwordHash
                });
                try {
                    user.save();
                    return res.status(200).json({
                        error: false,
                        message: "user added successfully"
                    });
                }
                catch (error) {
                    return res.status(500).json({
                        error: true,
                        message: "something went wrong"
                    });
                }
            }
            return res.status(400).json({
                error: true,
                message: "email already exits"
            });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const [email, password] = [res.locals.email, res.locals.password];
            const user = yield Users_1.default.findOne({ email: email });
            if (user) {
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (validPassword) {
                    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, type: "access" }, (0, config_1.default)('ACCESS_TOKEN_SECRET'), { expiresIn: '1h' });
                    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, type: "refresh" }, (0, config_1.default)('REFRESH_TOKEN_SECRET'), { expiresIn: '30d' });
                    return res.status(200).json({
                        error: false,
                        user: (new modules_1.Serializer(['_id', 'name', 'email'])).serialize(user),
                        tokens: {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    });
                }
                return res.status(400).json({
                    error: true,
                    message: "invalid password"
                });
            }
            return res.status(404).json({
                error: true,
                message: "email does not exit"
            });
        });
    }
    getAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = res.locals.id;
            const userExits = yield Users_1.default.findById(userId);
            if (userExits) {
                const accessToken = jsonwebtoken_1.default.sign({ id: userId, type: "access" }, (0, config_1.default)("ACCESS_TOKEN_SECRET"), { expiresIn: '1h' });
                return res.status(200).json({
                    error: false,
                    accessToken: accessToken
                });
            }
            return res.status(404).json({
                error: true,
                message: "user not found"
            });
        });
    }
}
exports.default = Authentication;
