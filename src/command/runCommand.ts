import { spawn } from "child_process";
import type { CommonSpawnOptions } from "child_process";
import { ironlauncherConfig } from "../config";

export function runCommand(args: string) {
  const stdio: CommonSpawnOptions["stdio"] = ironlauncherConfig.verbose
    ? "inherit"
    : "ignore";

  return new Promise((res, rej) => {
    if (ironlauncherConfig.devMode) {
      return res({});
    }
    const childProcess = spawn(args, { stdio, shell: true });

    childProcess.on("close", res);
    childProcess.on("error", rej);
  });
}
