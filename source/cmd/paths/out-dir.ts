import { join } from "path";
import { IronlauncherValue } from "../../types/cli-config";

export function getOutDir(config: IronlauncherValue) {
  return join(process.cwd(), config.name);
}
