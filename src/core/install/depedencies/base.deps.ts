export const baseExpress = [
  `dotenv`,
  `express`,
  `mongoose`,
  `morgan`,
  "cookie-parser",
];

const baseAuth = ["bcrypt"];

export const baseCookieAuth = [...baseAuth, "express-session", "connect-mongo"];

export const baseJWTAuth = [...baseAuth, "express-jwt", "jsonwebtoken"];

export const BASE_EXPRESS_DEV = ["nodemon"];
