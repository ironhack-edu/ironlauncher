import * as pkg from "../../package.json";
import { promisify } from "util";
import { exec } from "child_process";
import { Result } from "@swan-io/boxed";

export type Pkg = typeof pkg;

const execute = promisify(exec);

type IExecute = (command: string) => Promise<{ stdout: string }>;

export function getPkgDescription(
  pkgJson: Pkg["description"] = pkg.description
) {
  return pkgJson.trim();
}

export function getPkgName(pkgJson: Pkg["name"] = pkg.name) {
  return pkgJson.trim();
}

export function getPkgLocalVersion(pkgJson: Pkg["version"] = pkg.version) {
  return pkgJson.trim();
}

interface IGetRemoteVersion {
  pkgJson?: Pkg["name"];
  executor?: IExecute;
}
export async function getRemoteVersion({
  pkgJson = pkg.name,
  executor = execute,
}: IGetRemoteVersion) {
  const result = await Result.fromPromise(
    executor(`npm view ${pkgJson} version`)
  );

  return result.map(({ stdout }) => stdout.trim());
}

interface IIsPkgOutOfSync {
  pkgJson?: {
    name: Pkg["name"];
    version: Pkg["version"];
  };
  executor?: IExecute;
}

export async function isPkgOutOfSync({
  pkgJson = {
    name: pkg.name,
    version: pkg.version,
  },
  executor = execute,
}: IIsPkgOutOfSync) {
  const remote = await getRemoteVersion({ pkgJson: pkgJson.name, executor });
  const local = getPkgLocalVersion(pkgJson.version);

  return remote.map((v) => v !== local);
}
