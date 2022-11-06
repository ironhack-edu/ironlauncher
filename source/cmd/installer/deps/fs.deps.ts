import { IProjectDependency } from "../../../types/deps.types";

export const REACT_DEPS = [
  {
    name: "react",
  },
  {
    name: "react-dom",
  },
  {
    name: "react-scripts",
  },
  {
    name: "react-router-dom",
  },
  {
    name: "axios",
  },
  {
    name: "@testing-library/jest-dom",
    dev: true,
  },
  {
    name: "@testing-library/react",
    dev: true,
  },
  {
    name: "@testing-library/user-event",
    dev: true,
  },
] as const;
