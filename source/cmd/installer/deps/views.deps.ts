import { IProjectDependency } from "../../../types/deps.types";
import { BASE_BACKEND_DEPS } from "./base-backend.deps";

export const VIEWS_DEPS = [
  ...BASE_BACKEND_DEPS,
  {
    name: "hbs",
  },
  {
    name: "serve-favicon",
  },

  {
    name: "cookie-parser",
  },
  {
    name: "express-session",
  },
  {
    name: "connect-mongo",
  },
] as const satisfies readonly IProjectDependency[];


