import { IronlauncherValue } from "../../../types/cli-config";

export function makeCommandString(config: IronlauncherValue) {
  const packageManager = getPackageManager(config);
}

type IMakePathConfig = Pick<IronlauncherValue, "isDryRun" | "isPnpm">;
export function makeCommand(config: IronlauncherValue, path: string) {
  return {
    packageManager: "npm",
  };
}

function makePath(path: string, config: IronlauncherValue) {
  if (config.isDryRun) {
    return "";
  }

  if (config.isPnpm) {
    return `-C ${path}`;
  }

  return `--prefix ${path}`;
}

function getPackageManager(config: IronlauncherValue) {
  if (config.isDryRun) {
    return "npm";
  }

  if (config.isPnpm) {
    return "pnpm";
  }

  return "npm";
}
