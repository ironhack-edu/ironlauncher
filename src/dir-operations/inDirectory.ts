import path from "path";
import { ironlauncherConfig } from "../config";

export function inDir() {
  const isTypescript = __filename.includes(".ts");
  const joining = [__dirname, ".."];
  if (!isTypescript) {
    joining.push("..");
  }

  const restOfPath = [
    "template",
    ironlauncherConfig.template,
    ironlauncherConfig.variant,
  ];

  return path.join(...joining, ...restOfPath);
}
