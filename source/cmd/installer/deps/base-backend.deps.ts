import { IProjectDependency } from "../../../types/deps.types";

export const BASE_BACKEND_DEPS = [
  {
    name: "dotenv",
  },
  {
    name: "express",
  },
  {
    name: "mongoose",
  },
  {
    name: "bcrypt",
  },
  {
    name: "nodemon",
    dev: true,
  },
] as const satisfies readonly IProjectDependency[];;

const backendDeps = [{
  name: 'whatever'
}] as const satisfies readonly Readonly<IProjectDependency>[]
