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
        isHelp: false,
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
        isHelp: false,
      },
    },
    {
      flags: { views: true },
      result: {
        isHelp: false,
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
        isHelp: false,
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
        isHelp: false,
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.Some("fullstack"),
      },
    },
    {
      flags: { dryRun: true },
      result: {
        isHelp: false,
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
        isHelp: false,
        auth: "jwt",
        isDryRun: false,
        isPnpm: true,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: { p: true },
      result: {
        isHelp: false,
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
        isHelp: false,
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: true,
        template: Option.None(),
      },
    },
    {
      flags: { help: true },
      result: {
        isHelp: true,
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
    {
      flags: { h: true },
      result: {
        isHelp: true,
        auth: "jwt",
        isDryRun: false,
        isPnpm: false,
        isSkipInstall: false,
        template: Option.None(),
      },
    },
  ];

  for (const tc of testCases) {
    it(`should return ${JSON.stringify(
      tc.result
    )} when receives flags: ${JSON.stringify(tc.flags)}`, () => {
      const result = flagsData(tc.flags);

      expect(result).toEqual(tc.result);
    });
  }
});
