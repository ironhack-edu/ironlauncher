import { Result } from "@swan-io/boxed";
import groupBy from "just-group-by";
import { getIsDryRun } from "../../../src/config/flagParser";
import { IRunCommand, runCommand } from "../../lib/commands/run-command";
import { IronlauncherValue } from "../../types/cli-config";
import { IProjectDependency } from "../../types/deps.types";
import { handleBooleanValues } from "../../utils";
import { IMakeMakeMoveToFolderFunc, moveToFolder } from "./move-to-folder";

export type DependencyInstaller = {
  deps: IProjectDependency[];
};

export type ICommandArgs = {
  deps: (IProjectDependency & { path: string })[];
  isPnpm: IronlauncherValue["isPnpm"];
  isDryRun: IronlauncherValue["isDryRun"];
  isSkipInstall: IronlauncherValue["isSkipInstall"];
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

  return async ({ deps, isDryRun, isPnpm, isSkipInstall }) => {
    const organizeByPaths = groupBy(deps, ({ path }) => path);

    for (const [path, allDeps] of Object.entries(organizeByPaths)) {
      moveToOtherFolder({ directory: path, dryRun: isDryRun });

      const seperateDev = groupBy(
        allDeps.map((e) => ({ ...e, dev: e.dev || false })),
        (dep) => dep.dev.toString()
      );

      for (const [devStatus, packages] of Object.entries(seperateDev)) {
        const isDev = devStatus === "true";

        const command = makeCommandBase(
          { isPnpm, isDryRun, isSkipInstall },
          true
        ).join(" ");

        const dependenciesToInstall = packages.map((e) => e.name).join(" ");

        await runCommandFunc(`${command} ${dependenciesToInstall}`, true);
      }
    }

    return Result.Ok(undefined);
  };
};

function getPackageManager(
  value: Pick<IronlauncherValue, "isDryRun" | "isPnpm">
): "npm" | "pnpm" {
  if (handleBooleanValues(!value.isDryRun, value.isPnpm)) {
    return "pnpm";
  }

  return "npm";
}

function getInstallCommand(packageManager: "npm" | "pnpm") {
  if (packageManager === "pnpm") {
    return "add";
  }

  return "install";
}

function getSkipInstallCommand(
  value: Pick<IronlauncherValue, "isSkipInstall">,
  packageManager: "npm" | "pnpm"
) {
  if (!value.isSkipInstall) {
    return "";
  }
  if (packageManager === "npm") {
    return " --package-lock-only ";
  }

  return " --lockfile-only";
}

function getIsDevCommand(isDev = false) {
  return isDev ? "-D" : "";
}

function makeCommandBase(
  config: Pick<IronlauncherValue, "isSkipInstall" | "isPnpm" | "isDryRun">,
  isDev = false
) {
  const packageManager = getPackageManager(config);

  const installCommand = getInstallCommand(packageManager);

  const isDevCommand = getIsDevCommand(isDev);

  const dryRunCommand = getSkipInstallCommand(config, packageManager);

  return [packageManager, installCommand, dryRunCommand, isDevCommand];
}
