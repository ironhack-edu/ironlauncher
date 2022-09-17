import { ICLIConfig } from "../types/cli-config";
import { handleBooleanValues } from "../utils/bool-helpers";

export function getIsSkipInstall({
  ["skip-install"]: skipInstall,
}: ICLIConfig) {
  return handleBooleanValues(skipInstall);
}

export function getIsPnpm({ p = false, pnpm = false }: ICLIConfig) {
  return handleBooleanValues(p, pnpm);
}

export function getIsDevMode({ dev = false }: ICLIConfig) {
  return handleBooleanValues(dev, process.env.DEV_MODE);
}

export function getIsDryRun({
  ["dry-run"]: dryRun,
  dryRun: dryRunCommand,
}: ICLIConfig) {
  return handleBooleanValues(dryRun, dryRunCommand);
}

export function getIsBaseTemplate({ base, b }: ICLIConfig) {
  return handleBooleanValues(base, b);
}

export function getIsAuthTemplate({ auth, a }: ICLIConfig) {
  return handleBooleanValues(a, auth);
}

export function getIsViewsTemplate({ views }: ICLIConfig) {
  return handleBooleanValues(views);
}

export function getIsJsonTemplate({ json, JSON }: ICLIConfig) {
  return handleBooleanValues(json, JSON);
}

export function getIsFSTemplate({
  fs,
  fullStack,
  fullstack,
  ["full-stack"]: fsCommand,
}: ICLIConfig) {
  return handleBooleanValues(fs, fullStack, fullstack, fsCommand);
}

export function getIsHelpInFlags({ help, h }: ICLIConfig) {
  return handleBooleanValues(help, h);
}

export function getIsVerbose({ verbose }: ICLIConfig) {
  return handleBooleanValues(verbose);
}
