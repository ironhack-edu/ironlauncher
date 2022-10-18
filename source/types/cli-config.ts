import { IronlauncherTemplate } from "./template.type";

export type FlagData = string | boolean;

export type IIronlauncherConfig = {
  [key: string]: FlagData;
};

export type IIronLauncherInputs = string[];

export type IIronLauncherAuthOpts = "session" | "jwt";

export type IronlauncherValue = {
  auth: IIronLauncherAuthOpts;
  template: IronlauncherTemplate;
  isSkipInstall: boolean;
  isDryRun: boolean;
  isPnpm: boolean;
  name: string;
  isShowAll: boolean;
  isVerbose: boolean;
};
