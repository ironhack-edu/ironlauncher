import { Option } from "@swan-io/boxed";
import { sep } from "path";
import { InputsHandler } from "../core/inputs";
import { FsValidator } from "../core/validator";
import {
  ICLIConfig,
  IronLauncherTemplate,
  IronLauncherVariant,
} from "../types";
import { multipleBooleans } from "../utils/bools";
import { getFsState, getJSONState, getViewsState } from "./flagParser";
import { getName } from "./inputParser";

function getDisplayHelp(
  startingValue = false,
  flags: ICLIConfig,
  inputs: string[]
): boolean {
  const { help, h } = flags;

  const isHelpInFlags = Object.values(flags).includes("help");
  const isHelpInInputs = inputs.includes("help");

  return multipleBooleans(
    startingValue,
    help,
    h,
    isHelpInFlags,
    isHelpInInputs
  );
}

export class Config {
  constructor(private flags: ICLIConfig, private inputs: string[]) {}

  isVerbose() {
    const { v, verbose } = this.flags;

    return multipleBooleans(v, verbose);
  }

  isJSON() {
    const { json } = this.flags;

    return multipleBooleans(json);
  }
}

// function getFlags(flags: ICLIConfig, inputs: string[]) {
// 	const getFolderAndName = getNameAndFolderStatus(inputs)

// 	const name = getFolderAndName.

//   return {
//     isJSON: isJSON(flags),

//   };
// }

async function defineName(inputs: string[]) {
  const nameOption = getName(inputs);

  if (nameOption.isSome()) {
    return nameOption.get();
  }

  const { name } = await InputsHandler.getName();

  //  replaces white spaces for dashes
  return name.replace(/\s+/g, "-");
}

async function defineTemplate(
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

  const { project } = await InputsHandler.getProject();

  if (project) {
    return project;
  }

  return "views";
}

type IConfig = {
  name: string;
  skipInstall: boolean;
  isPnpm: boolean;
  isDebug: boolean;
  isDryRun: boolean;
  isVerbose: boolean;
  variant: IronLauncherVariant;
  template: IronLauncherTemplate;
};
