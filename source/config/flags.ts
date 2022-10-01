import { IIronlauncherConfig } from "../types/cli-config";
import { handleBooleanValues } from "../utils/bool-helpers";

export function getIsSkipInstall({
  ["skip-install"]: skipInstall,
}: IIronlauncherConfig) {
  return handleBooleanValues(skipInstall);
}

export function getIsPnpm({ p = false, pnpm = false }: IIronlauncherConfig) {
  return handleBooleanValues(p, pnpm);
}

export function getIsDevMode({ dev = false }: IIronlauncherConfig) {
  return handleBooleanValues(dev, process.env.DEV_MODE);
}

export function getIsDryRun({
  ["dry-run"]: dryRun,
  dryRun: dryRunCommand,
}: IIronlauncherConfig) {
  return handleBooleanValues(dryRun, dryRunCommand);
}

export function getIsBaseTemplate({ base, b }: IIronlauncherConfig) {
  return handleBooleanValues(base, b);
}

export function getIsAuthTemplate({ auth, a }: IIronlauncherConfig) {
  return handleBooleanValues(a, auth);
}

export function getIsViewsTemplate({ views }: IIronlauncherConfig) {
  return handleBooleanValues(views);
}

export function getIsJsonTemplate({ json, JSON }: IIronlauncherConfig) {
  return handleBooleanValues(json, JSON);
}

export function getIsFSTemplate({
  fs,
  fullStack,
  fullstack,
  ["full-stack"]: fsCommand,
}: IIronlauncherConfig) {
  return handleBooleanValues(fs, fullStack, fullstack, fsCommand);
}

export function getIsHelpInFlags({ help, h }: IIronlauncherConfig) {
  return handleBooleanValues(help, h);
}

export function getIsVerbose({ verbose }: IIronlauncherConfig) {
  return handleBooleanValues(verbose);
}
