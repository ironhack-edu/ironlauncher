export const baseExpress = [`dotenv`, `express`, `mongoose`, `morgan`];

const baseAuth = ["bcrypt"];

export const baseCookieAuth = [
  ...baseAuth,
  "cookie-parser",
  "express-session",
  "connect-mongo",
];

export const BASE_EXPRESS_DEV = ["nodemon"];
