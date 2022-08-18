import { ICLIConfig, IronLauncherVariant } from "../types";
import { multipleBooleans } from "../utils/bools";

export function getIsSkipInstall({
  ["skip-install"]: skipInstall,
}: ICLIConfig) {
  return multipleBooleans(skipInstall);
}

export function getIsPnpm({ p = false, pnpm = false }: ICLIConfig) {
  return multipleBooleans(p, pnpm);
}

export function getIsDevMode({ debug = false }: ICLIConfig) {
  const isDev = process.env.DEV === "true";
  return multipleBooleans(debug, isDev);
}

export function getIsDryRun(flags: ICLIConfig): boolean {
  const { ["dry-run"]: dryRun = false, dryRun: dryRunCommand = false } = flags;

  return multipleBooleans(dryRun, dryRunCommand);
}

export function getIsBaseTemplate(flags: ICLIConfig): boolean {
  const { base, b } = flags;

  return multipleBooleans(base, b);
}

export function getIsAuthTemplate(flags: ICLIConfig): boolean {
  const { a, auth } = flags;

  return multipleBooleans(a, auth);
}

export function getViewsState(flags: ICLIConfig): boolean {
  return multipleBooleans(flags.views);
}

export function getFsState(flags: ICLIConfig): boolean {
  const { fs, fullStack, fullstack } = flags;
  return multipleBooleans(fs, fullStack, fullstack);
}

export function getJSONState(flags: ICLIConfig): boolean {
  return multipleBooleans(flags.json);
}

export function getIsVerbose(flags: ICLIConfig) {
  const { v, verbose } = flags;

  return multipleBooleans(v, verbose);
}

export function getVariant(flags: ICLIConfig): IronLauncherVariant {
  if (getIsAuthTemplate(flags)) {
    return "authentication";
  }
  return "base";
}

export function getIsHelpInFlags(flags: ICLIConfig) {
  const { help, h } = flags;

  const helpKeyInCaseOfTitle = Boolean(help);

  return multipleBooleans(help, h, helpKeyInCaseOfTitle);
}
