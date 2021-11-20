import { baseExpress, baseCookieAuth } from "./base.deps";

export const JSON_EXPRESS_DEPS = [...baseExpress, `cookie-parser`, "cors"];

export const EXPRESS_IRONLAUNCHER_AUTH_DEPS = [
  ...JSON_EXPRESS_DEPS,
  ...baseCookieAuth,
];
