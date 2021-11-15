import { spawn } from "child_process";
import type { CommonSpawnOptions } from "child_process";
import { prevConfig } from "../config";

export function runCommand(args: string) {
  const stdio: CommonSpawnOptions["stdio"] = prevConfig.verbose
    ? "inherit"
    : "ignore";

  return new Promise((res, rej) => {
    // if (ironlauncherConfig.devMode) {
    //   console.log("ironlauncherConfig.devMode:", ironlauncherConfig.devMode);
    //   return res({});
    // }
    const childProcess = spawn(args, { stdio, shell: true });

    childProcess.on("close", res);
    childProcess.on("error", rej);
  });
}
