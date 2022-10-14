"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_EXPRESS_DEV = exports.baseJWTAuth = exports.baseCookieAuth = exports.baseExpress = void 0;
exports.baseExpress = [
    `dotenv`,
    `express`,
    `mongoose`,
    `morgan`,
    "cookie-parser",
];
const baseAuth = ["bcrypt"];
exports.baseCookieAuth = [...baseAuth, "express-session", "connect-mongo"];
exports.baseJWTAuth = [...baseAuth, "express-jwt", "jsonwebtoken"];
exports.BASE_EXPRESS_DEV = ["nodemon"];
