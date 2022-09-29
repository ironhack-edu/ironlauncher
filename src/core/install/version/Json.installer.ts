import { ironlauncherConfig } from "../../../config";
import {
  InstallBase,
  InitialPackages,
  IronlauncherConfig,
} from "../../../types";
import { InstallStructure } from "../base";
import {
  JSON_EXPRESS_DEPS,
  EXPRESS_IRONLAUNCHER_AUTH_DEPS,
  EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
  BASE_EXPRESS_DEV,
} from "../depedencies";

export class JSONInstaller extends InstallStructure {
  protected packages: InstallBase[];

  private mainPackages: InitialPackages[] = [
    {
      isDev: false,
      packages: JSON_EXPRESS_DEPS,
      scope: "backend",
    },
    {
      isDev: false,
      packages: EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
      scope: "backend",
      isAuth: true,
    },
  ];

  private devPackages: InitialPackages[] = [
    {
      isDev: true,
      packages: BASE_EXPRESS_DEV,
      scope: "backend",
    },
  ];

  constructor(
    prefix: string,
    protected config: IronlauncherConfig = ironlauncherConfig
  ) {
    super();
    this.packages = this.clearArr(
      [...this.mainPackages, ...this.devPackages],
      prefix
    );
  }
}
