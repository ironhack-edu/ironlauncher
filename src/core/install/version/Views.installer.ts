import { ironlauncherConfig } from "../../../config";
import {
  InstallBase,
  InitialPackages,
  IronlauncherConfig,
} from "../../../types";
import { InstallStructure } from "../base";
import {
  VIEWS_EXPRESS_BASE_DEPS,
  VIEWS_EXPRESS_AUTH_DEPTS,
  BASE_EXPRESS_DEV,
} from "../depedencies";

export class Views extends InstallStructure {
  protected packages: InstallBase[];

  private mainPackages: InitialPackages[] = [
    {
      isDev: false,
      packages: VIEWS_EXPRESS_BASE_DEPS,
      scope: "app",
      isAuth: false,
    },
    {
      isDev: false,
      packages: VIEWS_EXPRESS_AUTH_DEPTS,
      scope: "app",
      isAuth: true,
    },
  ];

  private devPackages: InitialPackages[] = [
    {
      isDev: true,
      packages: BASE_EXPRESS_DEV,
      scope: "app",
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
