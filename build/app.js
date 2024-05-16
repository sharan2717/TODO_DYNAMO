"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
const port = 3010;
app.use(body_parser_1.default.json());
app.use("/api/todo", routes_1.default);
app.listen();
exports.handler = (0, serverless_http_1.default)(app);
