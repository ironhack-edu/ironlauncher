import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import { getPkgDescription, getPkgLocalVersion } from "./pkg";

export function init() {
  unhandled();
  welcome({
    bgColor: "#2dc5fa",
    description: getPkgDescription(),
    color: "#333",
    version: getPkgLocalVersion(),
    clear: true,
    bold: true,
    title: "IronLauncher",
    tagLine: "by Ironhack",
  });
}
