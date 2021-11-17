import { baseCookieAuth, baseExpress } from "./base.deps";

export const VIEWS_EXPRESS_BASE_DEPS = [...baseExpress, `hbs`, `serve-favicon`];

export const VIEWS_EXPRESS_AUTH_DEPTS = [
  ...VIEWS_EXPRESS_BASE_DEPS,
  ...baseCookieAuth,
];
