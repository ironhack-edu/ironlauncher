/// <reference path="../types/index.d.ts" />
import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import { ironlauncherConfig } from "../config";
import { Package } from "../core/pkg/Package";

export function init() {
  unhandled();
  if (!ironlauncherConfig.devMode) {
    welcome({
      title: "IronGenerator",
      tagLine: "by Ironhack",
      description: Package.description,
      bgColor: "#2DC5FA",
      color: "#000000",
      version: Package.version,
      clear: true,
      bold: true,
    });
  }
}
