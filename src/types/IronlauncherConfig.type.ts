export interface ICLIConfig {
  [arg: string]: string | boolean;
}

export interface BaseConfig {
  // variants
  auth: boolean;
  base: boolean;

  //   templates
  json: boolean;
  views: boolean;
  fs: boolean;

  //   doesn't run anything
  dryRun: boolean;
  //   debugging
  verbose: boolean;
  devMode: boolean;
  variant: IronLauncherVariant;
  template?: IronLauncherTemplate;
  displayHelp: boolean;
  name: string;
  isPnpm: boolean;
  packageManager: `npm` | "pnpm";
  skipInstall: boolean;
}

export type IronLauncherTemplate = "views" | "json" | "fullstack";
export type IronLauncherVariant = "base" | "authentication";

export interface IronlauncherConfig extends BaseConfig {
  init(): Promise<void>;
}

export interface IronlauncherType {
  tech: "views" | "json" | "fs";
  variant: "authentication" | "base";
}
