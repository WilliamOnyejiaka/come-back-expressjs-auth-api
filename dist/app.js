"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const config_1 = __importDefault(require("./config/config"));
const models_1 = require("./models/models");
const app = (0, express_1.default)();
const PORT = (0, config_1.default)('PORT');
(0, models_1.connectDB)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(allowCredentials);
app.use('/api/auth', routes_1.auth);
app.get('/', (req, res) => {
    res.status(200).json({
        error: false,
        message: "Base url"
    });
});
models_1.mongoose.connection.once('open', () => {
    console.log("connected to database");
    app.listen(PORT, () => console.log(`server running on port - ${PORT}`));
});
