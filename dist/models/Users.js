"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const UserSchema = new models_1.mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    }
});
const User = models_1.mongoose.model("Users", UserSchema);
exports.default = User;
