import { describe, expect, it } from "vitest";
import { makeCommand as makeCommandStructure } from "./make-command-string";

describe("make-command", () => {
  it("should still display npm --dry-run even if package manager is pnpm", () => {
    const command = makeCommandStructure(
      {
        auth: "session",
        isDryRun: false,
        isPnpm: true,
        isShowAll: false,
        isSkipInstall: true,
        isVerbose: false,
        name: "",
        template: "fullstack",
      },
      "path"
    );

    expect(command.packageManager).toBe("npm");
  });

  it("should still display pnpm ", () => {
    const command = makeCommandStructure(
      {
        auth: "session",
        isDryRun: false,
        isPnpm: true,
        isShowAll: false,
        isSkipInstall: true,
        isVerbose: false,
        name: "",
        template: "fullstack",
      },
      "path"
    );

    expect(command.packageManager).toBe("pnpm");
  });
});
