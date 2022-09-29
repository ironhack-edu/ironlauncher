import { ironlauncherConfig } from "../../../config";
import {
  InstallBase,
  InitialPackages,
  IronlauncherConfig,
} from "../../../types";
import { InstallStructure } from "../base";
import {
  REACT_MAIN_DEPS,
  REACT_DEV_DEPS,
  JSON_EXPRESS_DEPS,
  EXPRESS_IRONLAUNCHER_AUTH_DEPS,
  EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
  BASE_EXPRESS_DEV,
} from "../depedencies";

interface IFullStack {
  bePrefix: string;
  fePrefix: string;
}

export class FullStack extends InstallStructure {
  protected packages: InstallBase[];

  private frontEndPackages: InitialPackages[] = [
    {
      packages: REACT_MAIN_DEPS,
      isDev: false,
      scope: "frontend",
    },
    {
      packages: REACT_DEV_DEPS,
      isDev: true,
      scope: "frontend",
    },
  ];
  private backEndPackages: InitialPackages[] = [
    {
      packages: JSON_EXPRESS_DEPS,
      isDev: false,
      scope: "backend",
    },
    {
      packages: EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
      isDev: false,
      scope: "backend",
      isAuth: true,
    },
    {
      packages: BASE_EXPRESS_DEV,
      isDev: true,
      scope: "backend",
    },
  ];

  constructor(
    { bePrefix, fePrefix }: IFullStack,
    protected config: IronlauncherConfig = ironlauncherConfig
  ) {
    super();

    const frontend: InstallBase[] = this.clearArr(
      this.frontEndPackages,
      fePrefix
    );
    const backend: InstallBase[] = this.clearArr(
      this.backEndPackages,
      bePrefix
    );

    this.packages = [...frontend, ...backend];
  }
}
