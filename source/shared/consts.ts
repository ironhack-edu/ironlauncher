export enum ENV_FLAGS {
  IHL_ALL = "IHL_ALL",
  IHL_VERBOSE = "IHL_VERBOSE",
}

export const IHL_FLAGS = {
  views: ["views"],
  json: ["json", "JSON"],
  fs: ["fs", "fullStack", "fullstack", "full-stack", "fUlLsTaCk", "FuLlStAcK"],
  pnpm: ["pnpm", "p"],
  dryRun: ["dry-run", "dryRun"],
  help: ["help", "h"],
  skipInstall: ["skip-install", "skipInstall"],
  verbose: ["verbose", "isVerbose"],
} as const;
