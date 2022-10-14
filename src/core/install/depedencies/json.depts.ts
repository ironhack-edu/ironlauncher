import { baseExpress, baseCookieAuth, baseJWTAuth } from "./base.deps";

export const JSON_EXPRESS_DEPS = [...baseExpress, `cookie-parser`, "cors"];

export const EXPRESS_IRONLAUNCHER_AUTH_DEPS = [
  ...JSON_EXPRESS_DEPS,
  ...baseCookieAuth,
];

export const EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS = [
  ...JSON_EXPRESS_DEPS,
  ...baseJWTAuth,
];