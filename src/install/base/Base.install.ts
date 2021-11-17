import { runCommand } from "../../command";
import { InstallBase, IronlauncherConfig } from "../../types";

export class SharedInstaller {
  private baseCommand = "npm ";
  private _devCommand = ` -D `;
  private _dryRun = " --package-lock-only ";
  private baseInstallVerb = " install ";
  private _pnpmDryRun = " --shrinkwrap-only ";

  public async execute(arg: InstallBase, config: IronlauncherConfig) {
    this.logScope(arg.scope);
    const command = this.npmCommand(arg, config);

    return runCommand(command);
  }

  private getPrefix(prefix: string, config: IronlauncherConfig) {
    if (config.packageManager === "npm") {
      return ` --prefix ${prefix} `;
    }
    return ` -C ${prefix}`;
  }

  private getPackages(packages: string[]) {
    return ` ${packages.join(" ")} `;
  }

  private dryRun(config: IronlauncherConfig) {
    if (config.packageManager === "npm") {
      return this._dryRun;
    }
    return this._pnpmDryRun;
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
    let command = config.packageManager + this.baseInstallVerb;

    if (prefix) {
      command += this.getPrefix(prefix, config);
    }

    if (this.getPackages.length) {
      command += this.getPackages(packages);
    }

    if (isDev) {
      command += this.devCommand;
    }

    if (config.dryRun) {
      command += this.dryRun(config);
    }
    return command;
  }
}
