import minimist from "minimist";
import { NameValidator } from "../../core/validator";
import type { FLAGS_OPTS } from "./helpText";
import { FLAGS } from "./helpText";
const args = minimist(process.argv.slice(2), {});

export const { _: inputs, "--": __, ...flags } = args;

export const displayHelp = () => {
  return inputs.includes("help") || !!args["help"];
};

export const getProjectName = () => {
  const nameValidator = new NameValidator();
  let name = inputs[0];
  let warnings: string[] = [];

  for (let key in flags) {
    const val = flags[key];

    if (typeof val !== "boolean") {
      warnings.push(val as string);
    }
  }

  if (warnings.length) {
    return {
      currentName: name,
      warnings,
    };
  }
  return {
    currentName: name,
  };
};

export function getName() {
  let [name = ""] = inputs;
  const newFlags: Record<string, boolean> = {};

  const isValid = NameValidator.validate(name);
  const isValidName = typeof isValid === "boolean";

  for (const key in flags) {
    const value = flags[key];
    if (FLAGS.includes(key as FLAGS_OPTS)) {
      if (typeof value === "string") {
        if (value === "true") {
          newFlags[key] = true;
        } else if (value === "false") {
          newFlags["key"] = false;
        } else {
          if (!name) {
            if (!isValidName) {
              name = value;
            }
          }
          newFlags[key] = true;
        }
      } else {
        newFlags[key] = value;
      }
    }
  }

  if (isValidName) {
    return { name };
  }
  return {
    name: "",
    issue: isValid,
  };
}
