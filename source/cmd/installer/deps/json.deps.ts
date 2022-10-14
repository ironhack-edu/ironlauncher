import { IProjectDependency } from "../../../types/deps.types";
import { BASE_BACKEND_DEPS } from "./base-backend.deps";

export const JSON_DEPS = [
 ...BASE_BACKEND_DEPS,
  {
    name: "express-jwt",
  },
  {
    name: "jsonwebtoken",
  },

] as const satisfies readonly IProjectDependency[];
