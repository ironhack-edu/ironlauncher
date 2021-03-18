import welcome from "cli-welcome";
import unhandled from "cli-handle-unhandled";
import pkg from "../../package.json";
export function init() {
  unhandled();
  welcome({
    title: "IronLauncher",
    tagLine: "by Ironhack",
    description: pkg.description,
    version: pkg.version,
    bgColor: "#2DC5FA",
    color: "#000000",
    clear: true,
    bold: true,
  });
}
