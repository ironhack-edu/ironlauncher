import { prevConfig } from "../config";
import { runCommand } from "./runCommand";

interface NpmInstall {
  basePath: string;
  packages: string[];
  devPackages: string[];
  scope?: string;
}

interface NpmCommand {
  basePath: string;
  packages: string[];
  isDev?: boolean;
  scope?: string;
}

export async function npmCommand(npmArgs: NpmCommand) {
  let command = "npm install ";

  if (npmArgs.basePath) {
    command += ` --prefix ${npmArgs.basePath} `;
  }

  if (npmArgs.scope) {
    console.log(`About to start installing ${npmArgs.scope} dependencies`);
  }

  if (npmArgs.isDev) {
    command += ` -D `;
  }

  if (npmArgs.packages.length) {
    command += ` ${npmArgs.packages.join(" ")} `;
  }

  if (prevConfig.dryRun) {
    command += ` --dry-run`;
  }

  await runCommand(command);
}

export async function npmInstall(npmArgs: NpmInstall) {
  const { basePath, packages, devPackages = [], scope = "" } = npmArgs;

  if (scope) {
    console.log(`About to start installing ${scope} dependencies`);
  }
  await runCommand(`npm install --prefix ${basePath} ${packages.join(" ")}`);

  if (devPackages.length) {
    if (scope) {
      console.log(`About to start installing ${scope} devDependencies`);
    }
    await runCommand(
      `npm install --save-dev --prefix ${basePath} ${devPackages.join(" ")} `
    );
  }
}
