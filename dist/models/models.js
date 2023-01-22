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
exports.Users = exports.connectDB = exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const config_1 = __importDefault(require("./../config/config"));
const Users_1 = __importDefault(require("./Users"));
exports.Users = Users_1.default;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", false);
    try {
        yield mongoose_1.default.connect((0, config_1.default)('MONGODB_URI'));
    }
    catch (err) {
        console.log(err);
    }
});
exports.connectDB = connectDB;
