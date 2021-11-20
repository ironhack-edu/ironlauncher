import {
  InstallBase,
  IronlauncherConfig,
  InitialPackages,
} from "../../../types";
import { SharedInstaller } from "./Base.install";

export abstract class InstallStructure {
  protected abstract packages: InstallBase[];
  protected installer: SharedInstaller = new SharedInstaller();
  protected abstract config: IronlauncherConfig;

  public async install() {
    for (const command of this.packages) {
      await this.installer.execute(command, this.config);
    }
  }

  protected clearArr(arr: InitialPackages[], prefix: string): InstallBase[] {
    return arr
      .filter((e) => {
        if (this.config.auth) {
          return e.isAuth || e.isAuth == null;
        }
        return !e.isAuth;
      })
      .map((e) => {
        const { isAuth, ...packages } = e;

        return {
          ...packages,
          prefix,
        };
      });
  }
}
