import { spawn } from "child_process";
import type { CommonSpawnOptions } from "child_process";
import { IronlauncherConfig } from "../../types";
import { ironlauncherConfig } from "../../config";

export class Runner {
  constructor(private config: IronlauncherConfig = ironlauncherConfig) {}

  private get stdio(): CommonSpawnOptions["stdio"] {
    return this.config.verbose ? "inherit" : "ignore";
  }
  execute(command: string) {
    return new Promise((res, rej) => {
      const childProcess = spawn(command, { stdio: this.stdio, shell: true });

      childProcess.on("close", res);
      childProcess.on("error", rej);
    });
  }
}
