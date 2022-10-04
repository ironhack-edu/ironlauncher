import { Option } from "@swan-io/boxed";
import {
  IIronlauncherConfig,
  IIronLauncherInputs,
  IronlauncherValue,
} from "../types/cli-config";
import { askName } from "../cmd/inputs/ask-name";
import { handleBooleanValues } from "../utils";
import { flagsData, getIsHelpInInputs, makeGetNameIsInInputs } from "../cli";
import { getEnvInfo } from "../env";
import { askProjectType } from "../cmd/inputs/ask-template";

const getNameInInputs = makeGetNameIsInInputs();

export async function makeConfig(
  cliFlags: IIronlauncherConfig,
  cliInputs: IIronLauncherInputs
): Promise<Option<IronlauncherValue>> {
  const { isHelp, ...flags } = flagsData(cliFlags);

  const helpInInputs = getIsHelpInInputs(cliInputs);

  const userAsksForHelp = handleBooleanValues(helpInInputs, isHelp);

  if (userAsksForHelp) {
    return Option.None();
  }

  const name = await makeName(getNameInInputs(cliInputs));

  const template = await makeTemplate(flags.template);

  const envStatus = getEnvInfo();

  return Option.Some({
    ...flags,
    name,
    template,
    ...envStatus,
  });
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

  const { project } = await askProjectType();

  return project;
}
