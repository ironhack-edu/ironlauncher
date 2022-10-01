import { Option } from "@swan-io/boxed";
import { describe, expect, it } from "vitest";
import { IIronlauncherConfig } from "../../types/cli-config";
import { flagsData } from "./flags";

type FlagsData = ReturnType<typeof flagsData>;

type TestCase = {
  result: FlagsData;
  flags: IIronlauncherConfig | undefined;
};

describe("flagsData", () => {
  const testCases: TestCase[] = [
    {
      flags: undefined,
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: {},
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: { views: true },
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.Some("views"),
      },
    },
    {
      flags: { json: true },
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.Some("json"),
      },
    },
    {
      flags: { fs: true },
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.Some("fs"),
      },
    },
    {
      flags: { dryRun: true },
      result: {
        auth: "jwt",
        isDryRun: true,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: { pnpm: true },
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: true,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: { "skip-install": true },
      result: {
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: true,
        template: Option.None(),
      },
    },
  ];

  for (const tc of testCases) {
    it(`should return ${tc.result} when receives flags: ${tc.flags}`, () => {
      const result = flagsData(tc.flags);

      expect(result).toEqual(tc.result);
    });
  }
});
