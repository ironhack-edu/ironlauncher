/// <reference path="../types/index.d.ts" />
import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import pkg from "../../package.json";

export function init() {
  unhandled();
  welcome({
    title: "IronGenerator",
    tagLine: "by Ironhack",
    description: pkg.description,
    bgColor: "#2DC5FA",
    color: "#000000",
    version: pkg.version,
    clear: true,
    bold: true,
  });
}
