import {
  ICLIConfig,
  IronLauncherTemplate,
  IronLauncherVariant,
} from "../types";
import { flags, inputs } from "../utils/cli";
import {
  getIsDevMode,
  getIsDryRun,
  getIsPnpm,
  getIsSkipInstall,
  getIsVerbose,
} from "./flagParser";
import {
  defineName,
  defineVariant,
  defineTemplate,
  getDisplayHelp,
} from "./retrieveValues";
import { isPkgOutOfSync } from "../core/pkg/Package";

export class Config {
  private constructor(readonly config: Readonly<IConfig>) {}

  static async create(config: IConfig): Promise<Config> {
    return new Config(config);
  }

  debug() {
    console.log(`---- TEMPLATE ----`);
    console.log(`TEMPLATE: - ${this.config.template}`);
    console.log(`VARIANT: ${this.config.variant}`);

    console.log(`NAME: ${this.config.name}`);

    console.log(`---- DEBUG ----`);
    console.log(`DRYRUN: ${this.config.isDryRun}`);
    console.log(`---- displayHelp ----`);
    console.log(`DISPLAY_HELP: ${this.config.isDisplayHelp}`);
  }
}

export type IConfig = {
  name: string;
  variant: IronLauncherVariant;
  template: IronLauncherTemplate;
  isDev: boolean;
  isDryRun: boolean;
  isVerbose: boolean;
  isSkipInstall: boolean;
  isDisplayHelp: boolean;
  packageManager: "pnpm" | "npm";
  isOutOfSync: boolean;
};

async function getConfig(flags: ICLIConfig, input: string[]): Promise<IConfig> {
  const name = await defineName(input);
  const variant = await defineVariant(flags);
  const template = await defineTemplate(flags);

  const isDryRun = getIsDryRun(flags);

  const isDisplayHelp = getDisplayHelp(flags, input);

  const isVerbose = getIsVerbose(flags);

  const isDev = getIsDevMode(flags);

  const packageManager = getIsPnpm(flags) ? "pnpm" : "npm";

  const isSkipInstall = getIsSkipInstall(flags);

  const isOutOfSync = await isPkgOutOfSync();

  return {
    name,
    variant,
    template,
    isDev,
    isDryRun,
    isVerbose,
    packageManager,
    isSkipInstall,
    isDisplayHelp,
    isOutOfSync,
  };
}

export const makeConfig = async (): Promise<Config> => {
  const configObject = await getConfig(flags, inputs);
  return await Config.create(configObject);
};
