import { runCommand } from "../../command";
import { InstallBase, IronlauncherConfig } from "../../types";

export class SharedInstaller {
  private baseCommand = "npm install ";
  private _devCommand = ` -D `;
  private _dryRun = " --dry-run ";

  public execute(arg: InstallBase, config: IronlauncherConfig) {
    this.logScope(arg.scope);
    const command = this.npmCommand(arg, config);

    return runCommand(command);
  }

  private getPrefix(prefix: string) {
    return ` --prefix ${prefix} `;
  }

  private getPackages(packages: string[]) {
    return ` ${packages.join(" ")} `;
  }

  private get dryRun() {
    return this._dryRun;
  }

  private get devCommand() {
    return this._devCommand;
  }

  private logScope(scope: string = "") {
    if (scope) {
      console.log(`About to start installing ${scope} dependencies`);
    }
  }

  private npmCommand(arg: InstallBase, config: IronlauncherConfig) {
    const { prefix, packages, isDev } = arg;
    let command = this.baseCommand;

    if (prefix) {
      command += this.getPrefix(prefix);
    }

    if (config.dryRun) {
      command += this.dryRun;
    }

    if (isDev) {
      command += this.devCommand;
    }

    return command + this.getPackages(packages);
  }
}
