const pkg = require("../../../package.json");
import { promisify } from "util";
import { exec } from "child_process";

export function getPkgLocalVersion() {
  return pkg.version.trim();
}

export function getPkgName() {
  return pkg.name;
}

export function getPkgDescription() {
  return pkg.description as string;
}

export async function getRemoteVersion(pkg: string) {
  const execute = promisify(exec);
  try {
    const { stdout } = await execute(`npm view ${pkg} version`);
    return stdout.trim();
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export async function isPkgOutOfSync() {
  const remote = await getRemoteVersion(pkg.name);
  const local = getPkgLocalVersion();
  return remote !== local;
}
