import { Option } from "@swan-io/boxed";
import {
  flagsData,
  getIsHelpInInputs,
  IFlagsData,
  makeGetNameIsInInputs,
} from "../cli";
import { askName } from "../cmd/inputs/ask-name";
import { askProjectType } from "../cmd/inputs/ask-template";
import { getEnvInfo } from "../env";
import {
  IIronlauncherConfig,
  IIronLauncherInputs,
  IronlauncherValue,
} from "../types/cli-config";
import { IronlauncherTemplate } from "../types/template.type";
import { handleBooleanValues } from "../utils";

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

  isCurrentFolder() {
    return this.cliInputs?.[0] === ".";
  }

  async get(): Promise<Option<IronlauncherValue>> {
    if (this.isHelp) {
      return Option.None();
    }

    const name = await makeName(getNameInInputs(this.cliInputs));

    const template = await makeTemplate(this.flagData.template);

    const envStatus = getEnvInfo();

    const isVerbose = envStatus.isVerbose || this.flagData.isVerbose;

    return Option.Some({
      ...this.flagData,
      name,
      template,
      ...envStatus,
      isVerbose,
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

async function makeTemplate(template: Option<IronlauncherTemplate>) {
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
