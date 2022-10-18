import { Option } from "@swan-io/boxed";
import {
  IIronlauncherConfig,
  IIronLauncherInputs,
  IronlauncherValue,
} from "../types/cli-config";
import { askName } from "../cmd/inputs/ask-name";
import { handleBooleanValues } from "../utils";
import {
  flagsData,
  getIsHelpInInputs,
  IFlagsData,
  makeGetNameIsInInputs,
} from "../cli";
import { getEnvInfo } from "../env";
import { askProjectType } from "../cmd/inputs/ask-template";
import { makeReadDirFunc } from "../lib/fs/read-dir/read-dir";
import { join } from "path";

const getNameInInputs = makeGetNameIsInInputs();

export class IronlauncherConfig {
  isHelp: boolean;
  flagData: Omit<IFlagsData, "isHelp">;

  constructor(
    flags: IIronlauncherConfig,
    private cliInputs: IIronLauncherInputs
  ) {
    const { isHelp, ...rest } = flagsData(flags);
    const helpInInputs = getIsHelpInInputs(cliInputs);

    const userAsksForHelp = handleBooleanValues(helpInInputs, isHelp);

    this.isHelp = userAsksForHelp;
    this.flagData = rest;
  }

  async get(): Promise<Option<IronlauncherValue>> {
    if (this.isHelp) {
      return Option.None();
    }

    const name = await makeName(getNameInInputs(this.cliInputs));

    const template = await makeTemplate(this.flagData.template);

    const envStatus = getEnvInfo();

    return Option.Some({
      ...this.flagData,
      name,
      template,
      ...envStatus,
    });
  }
}

async function makeName(nameOpt: Option<string>) {
  if (nameOpt.isSome()) {
    return nameOpt.get();
  }

  const value = await askName();

  return value;
}

async function makeTemplate(template: Option<"json" | "views" | "fullstack">) {
  if (template.isSome()) {
    return template.get();
  }

  const project = await askProjectType([
    { title: "views", value: "views" },
    { title: "json", value: "json" },
    { title: "fullstack", value: "fullstack" },
  ]);

  return project;
}
