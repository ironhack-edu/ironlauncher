import { join } from "path";
import { npmInstall } from "../command";
import { cliConfig } from "../config";
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

  await Promise.all([
    await npmInstall({
      basePath: client,
      packages: REACT_MAIN_DEPS,
      devPackages: REACT_DEV_DEPS,
      scope: "frontend",
    }),
    await npmInstall({
      basePath: server,
      packages: cliConfig.isAuth
        ? EXPRESS_IRONLAUNCHER_AUTH_DEPS
        : JSON_EXPRESS_DEPS,
      devPackages: BASE_EXPRESS_DEV,
      scope: "backend",
    }),
  ]);

  // await Promise.all([
  // execa(
  //   ...returnScript({
  //     deps: BASE_EXPRESS_DEV,
  //     prefix: server,
  //     isDev: true,
  //   })
  // ),
  // execa(
  //   ...returnScript({ deps: REACT_DEV_DEPS, isDev: true, prefix: client })
  // ),
  // ]);
}
