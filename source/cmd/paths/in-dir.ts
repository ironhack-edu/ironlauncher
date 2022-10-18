import { join } from "path";
import { IronlauncherValue } from "../../types/cli-config";
import { getTemplateDir } from "./get-template-dir";

export function getInDir(templateName: IronlauncherValue) {
  return join(getTemplateDir(), templateName.template, "authentication");
}
