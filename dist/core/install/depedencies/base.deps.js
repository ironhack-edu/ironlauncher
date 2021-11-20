"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_EXPRESS_DEV = exports.baseCookieAuth = exports.baseExpress = void 0;
exports.baseExpress = [`dotenv`, `express`, `mongoose`, `morgan`];
const baseAuth = ["bcrypt"];
exports.baseCookieAuth = [
    ...baseAuth,
    "cookie-parser",
    "express-session",
    "connect-mongo",
];
exports.BASE_EXPRESS_DEV = ["nodemon"];
