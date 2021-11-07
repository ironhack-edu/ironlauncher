import { runCommand } from "./runCommand";

interface NpmInstall {
  basePath: string;
  packages: string[];
  devPackages: string[];
  scope?: string;
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
