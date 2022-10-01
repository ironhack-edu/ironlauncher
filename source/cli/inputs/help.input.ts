import { IIronLauncherInputs } from "../../types/cli-config";

export function getIsHelpInInputs(inputs: IIronLauncherInputs = []) {
  return inputs.includes("help");
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("getIsHelpInInputs should work", () => {
    expect(getIsHelpInInputs()).toBe(false);
    expect(getIsHelpInInputs(["test", "something else", "help-me"])).toBe(
      false
    );

    expect(getIsHelpInInputs(["help"])).toBe(true);
  });
}
