import { FlagData } from "../types/cli-config";

function isBoolean(option?: FlagData) {
  if (typeof option === "string") {
    return option.trim() === "true";
  }

  return option === true;
}

export function handleBooleanValues(...options: Array<FlagData | undefined>) {
  return options.some((opt) => isBoolean(opt));
}
