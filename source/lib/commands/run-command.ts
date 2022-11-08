import { ChildProcess, spawn, SpawnOptions } from "child_process";

type IMakeChildProcess = (
  command: string,
  options: SpawnOptions
) => ChildProcess;

type IMakeCommand = (func?: IMakeChildProcess) => IRunCommand;

export type IRunCommand = (
  command: string,
  verbose?: boolean
) => Promise<unknown>;

export const makeCommand: IMakeCommand = (func = spawn) => {
  return (command, verbose) => {
    return new Promise((resolve, reject) => {
      const childProcess = func(command, {
        stdio: verbose ? "inherit" : "ignore",
        shell: true,
      });

      childProcess.on("close", resolve);

      childProcess.on("error", reject);
    });
  };
};

export const runCommand = makeCommand();
