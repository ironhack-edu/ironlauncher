import { join } from "path";
import { IronlauncherValue } from "../../types/cli-config";
import { getTemplateDir } from "./get-template-dir";

export function getInDir({ template }: IronlauncherValue) {
  return join(getTemplateDir(), template, "authentication");
}
