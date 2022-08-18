import { askProjectName, askProjectType, askVariant } from "../core/inputs";
import {
  ICLIConfig,
  IronLauncherTemplate,
  IronLauncherVariant,
} from "../types";
import { multipleBooleans } from "../utils/bools";
import {
  getViewsState,
  getJSONState,
  getFsState,
  getIsBaseTemplate,
  getIsAuthTemplate,
  getIsHelpInFlags,
} from "./flagParser";
import { getIsHelpInInputs, getName } from "./inputParser";

export async function defineName(inputs: string[]) {
  const nameOption = getName(inputs);

  if (nameOption.isSome()) {
    return nameOption.get();
  }

  const { name } = await askProjectName();

  //  replaces white spaces for dashes
  return name.replace(/\s+/g, "-");
}

export async function defineTemplate(
  flags: ICLIConfig
): Promise<IronLauncherTemplate> {
  const isViews = getViewsState(flags);
  const isJson = getJSONState(flags);
  const isFs = getFsState(flags);

  if (isViews) {
    return "views";
  }

  if (isJson) {
    return "json";
  }

  if (isFs) {
    return "fullstack";
  }

  const { project } = await askProjectType();

  if (project) {
    return project;
  }

  return "views";
}

export async function defineVariant(
  flags: ICLIConfig
): Promise<IronLauncherVariant> {
  const isBase = getIsBaseTemplate(flags);
  const isAuth = getIsAuthTemplate(flags);

  if (isBase) {
    return "base";
  }

  if (isAuth) {
    return "authentication";
  }

  const { variant } = await askVariant();

  if (variant) {
    return "authentication";
  }

  return "base";
}

export function getDisplayHelp(flags: ICLIConfig, inputs: string[]) {
  const isHelpInFlags = getIsHelpInFlags(flags);
  const isHelpInInputs = getIsHelpInInputs(inputs);

  return multipleBooleans(isHelpInFlags, isHelpInInputs);
}
