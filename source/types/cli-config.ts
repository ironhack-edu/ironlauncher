export type FlagData = string | boolean;

export type IIronlauncherConfig = {
  [key: string]: FlagData;
};

export type IIronLauncherInputs = string[];

export type IronlauncherValue = {
  auth: "session" | "jwt";
  template: "views" | "json" | "fullstack";
  isSkipInstall: boolean;
  isDryRun: boolean;
  isPnpm: boolean;
  name: string;
  isShowAll: boolean;
  isVerbose: boolean;
};
