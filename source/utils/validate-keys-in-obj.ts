import { IIronlauncherConfig, FlagData } from "../types/cli-config";

export function validateKeysInObj<
  T extends readonly string[],
  Key extends T[number]
>(obj: IIronlauncherConfig, arr: T): { [K in Key]: FlagData } {
  const keys = {} as { [K in Key]: FlagData };

  arr.forEach((opt) => {
    const option = opt as Key;

    keys[option] = obj[option] ?? false;
  });

  return keys;
}
