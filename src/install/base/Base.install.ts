import { Runner } from "../../core/cmd";
import { InstallBase, IronlauncherConfig } from "../../types";

export class SharedInstaller {
  private baseCommand = "npm ";
  private _devCommand = ` -D `;
  private _npmDryRun = " --package-lock-only " as const;
  private npmDryRun = " --dry-run " as const;
  private baseInstallVerb = " install " as const;
  private _pnpmDryRun = " --shrinkwrap-only " as const;
  constructor(protected runner: Runner = new Runner()) {}

  public async execute(arg: InstallBase, config: IronlauncherConfig) {
    this.logScope(arg.scope);
    const command = this.npmCommand(arg, config);

    return this.runner.execute(command);
  }

  private getPrefix(prefix: string, config: IronlauncherConfig) {
    if (config.dryRun) {
      return "";
    }
    if (config.packageManager === "npm") {
      return ` --prefix ${prefix} `;
    }
    return ` -C ${prefix}`;
  }

  private getPackages(packages: string[]) {
    return ` ${packages.join(" ")} `;
  }

  private dryRun(config: IronlauncherConfig) {
    if (config.dryRun) {
      return this.npmDryRun;
    }
    if (config.packageManager === "npm" || config.dryRun) {
      return this._npmDryRun;
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
