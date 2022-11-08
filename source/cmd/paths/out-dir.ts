import { basename, dirname, join } from "path";
import { IronlauncherValue } from "../../types/cli-config";

export function getOutDir(config: IronlauncherValue, isCurrentFolder = false) {
  if (isCurrentFolder) {
    return process.cwd();
  }
  return join(process.cwd(), config.name);
}
