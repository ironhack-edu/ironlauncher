import { join } from "path";
import { npmCommand, npmInstall } from "../command";
import { prevConfig } from "../config";
import {
  BASE_EXPRESS_DEV,
  EXPRESS_IRONLAUNCHER_AUTH_DEPS,
  JSON_EXPRESS_DEPS,
  REACT_DEV_DEPS,
  REACT_MAIN_DEPS,
} from "./dependencies";

export async function fullStackInstall(basePath: string) {
  const client = join(basePath, "client");
  const server = join(basePath, "server");

  await npmCommand({
    basePath: client,
    packages: REACT_MAIN_DEPS,
    scope: "frontend",
  });

  await npmCommand({
    basePath: client,
    packages: REACT_DEV_DEPS,
    scope: "frontend",
    isDev: true,
  });

  await npmCommand({
    basePath: server,
    packages: prevConfig.isAuth
      ? EXPRESS_IRONLAUNCHER_AUTH_DEPS
      : JSON_EXPRESS_DEPS,
    scope: "backend",
  });

  await npmCommand({
    basePath: server,
    packages: BASE_EXPRESS_DEV,
    isDev: true,
    scope: "backend",
  });

  // await Promise.all([
  //   await npmInstall({
  //     basePath: client,
  //     packages: REACT_MAIN_DEPS,
  //     devPackages: REACT_DEV_DEPS,
  //     scope: "frontend",
  //   }),
  //   await npmInstall({
  //     basePath: server,
  //     packages: ironlauncherConfig.isAuth
  //       ? EXPRESS_IRONLAUNCHER_AUTH_DEPS
  //       : JSON_EXPRESS_DEPS,
  //     devPackages: BASE_EXPRESS_DEV,
  //     scope: "backend",
  //   }),
  // ]);
}
