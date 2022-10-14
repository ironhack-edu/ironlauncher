import { IronlauncherValue } from "../../../types/cli-config";

export function makeCommandString(info: IronlauncherValue) {}

type IMakePathConfig = Pick<IronlauncherValue, "isDryRun" | "isPnpm">;
function makePath(path: string, config: IronlauncherValue) {
  if (config.isDryRun) {
    return "";
  }

  if (config.isPnpm) {
    return `-C ${path}`;
  }

  return `--prefix ${path}`;
}
