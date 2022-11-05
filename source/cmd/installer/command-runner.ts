import { Result } from "@swan-io/boxed";
import { IRunCommand, runCommand } from "../../lib/commands/run-command";
import { IProjectDependency } from "../../types/deps.types";
import { IMakeMakeMoveToFolderFunc, moveToFolder } from "./move-to-folder";

export type DependencyInstaller = {
  deps: IProjectDependency[];
  path: string;
};

export type ICommandArgs = {
  dryRun: boolean;
  deps: DependencyInstaller[];
};

export type ICommandRunnerArgs = {
  runCommandFunc?: IRunCommand;
  moveToOtherFolder?: IMakeMakeMoveToFolderFunc;
};

export type ICommandRunner = (
  opts?: ICommandRunnerArgs
) => (args: ICommandArgs) => Promise<Result<void, unknown>>;

export const makeCommandRunner: ICommandRunner = (opts = {}) => {
  const { moveToOtherFolder = moveToFolder, runCommandFunc = runCommand } =
    opts;

  return async ({ deps, dryRun }) => {
    const newPath = deps.map((e) => ({
      ...e,
      path: dryRun ? process.cwd() : e.path,
    }));

    return Result.Ok(undefined);
  };
};
