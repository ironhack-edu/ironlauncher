import { join } from "path";

export function getTemplateDir() {
  const basePath = join(require.main!.path, "..");

  return join(basePath, "template");
}
