const baseExpress = [`dotenv`, `express`, `mongoose`, `morgan`];

const baseAuth = ["bcrypt"];
const baseCookieAuth = [
  ...baseAuth,
  "cookie-parser",
  "express-session",
  "connect-mongo",
];

export const BASE_EXPRESS_DEV = ["nodemon"];

export const VIEWS_EXPRESS_BASE_DEPS = [...baseExpress, `hbs`, `serve-favicon`];

export const VIEWS_EXPRESS_AUTH_DEPTS = [
  ...VIEWS_EXPRESS_BASE_DEPS,
  ...baseCookieAuth,
];

export const JSON_EXPRESS_DEPS = [...baseExpress, `cookie-parser`, "cors"];

export const JSON_EXPRESS_DEPS_AUTH = [...JSON_EXPRESS_DEPS, ...baseCookieAuth];

export const REACT_MAIN_DEPS = [
  "react",
  "react-dom",
  "react-scripts",
  `react-router-dom`,
  `axios`,
];

export const REACT_DEV_DEPS = [
  "@testing-library/jest-dom",
  "@testing-library/react",
  "@testing-library/user-event",
];

export const EXPRESS_IRONLAUNCHER_AUTH_DEPS = [
  ...JSON_EXPRESS_DEPS,
  ...baseAuth,
];
