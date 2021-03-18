import { byName, isNotEmpty } from "./checkName";
import { sep } from "path";

export function getName(input: string[]) {
  if (input.includes(".")) {
    if (isNotEmpty()) {
      return {
        name: "",
        issue: "The current folder is not empty",
      };
    }
    const [currentFolder] = process.cwd().split(sep).slice(-1);
    return { name: currentFolder, issue: "" };
  }
  if (input[0]) {
    const exists = byName(input[0]);
    if (exists) {
      return {
        name: "",
        issue: "That folder already exists.",
      };
    }
    return {
      name: input[0],
      issue: "",
    };
  }

  return {
    name: "",
    issue: "",
  };
}
