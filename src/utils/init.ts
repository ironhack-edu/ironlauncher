/// <reference path="../types/index.d.ts" />
import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import { ironlauncherConfig } from "../config";
import { getPkgDescription, getPkgLocalVersion } from "../core/pkg/Package";

export function init() {
  unhandled();
  if (!ironlauncherConfig.devMode) {
    welcome({
      title: "IronGenerator",
      tagLine: "by Ironhack",
      description: getPkgDescription(),
      bgColor: "#2DC5FA",
      color: "#000000",
      version: getPkgLocalVersion(),
      clear: true,
      bold: true,
    });
  }
}
