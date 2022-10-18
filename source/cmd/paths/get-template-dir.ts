import { join } from "path";

export function getTemplateDir() {
  return join(process.cwd(), "template");
}
