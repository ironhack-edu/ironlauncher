import { Option } from "@swan-io/boxed";
import { sep } from "path";
import { FsValidator } from "../core/validator";

export function getName(inputs: string[]): Option<string> {
  const [name = ""] = inputs;

  if (!name) {
    return Option.None();
  }

  const isEmpty = FsValidator.dirEmpty();

  if (name === "." && isEmpty) {
    return Option.None();
  }

  if (name === ".") {
    return Option.Some(process.cwd().split(sep).slice(-1)[0]);
  }

  const exists = FsValidator.folderExists(name);

  if (exists) {
    return Option.None();
  }

  return Option.Some(name);
}

export function isCurrentFolder(inputs: string[]): Option<true> {
  const [name = ""] = inputs;

  const isEmpty = FsValidator.dirEmpty();

  if (name === "." && isEmpty) {
    return Option.Some(true);
  }

  return Option.None();
}

export function getIsHelpInInputs(inputs: string[]) {
  return inputs.includes("help");
}
