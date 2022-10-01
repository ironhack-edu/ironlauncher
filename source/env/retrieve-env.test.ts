import { it, expect, describe } from "vitest";
import { ENV_FLAGS } from "../shared";
import { envStatus } from "./retrieve-env";

type TestCases = {
  flags: NodeJS.ProcessEnv;
  result: { isShowAll: boolean; isVerbose: boolean };
};

const testCases: TestCases[] = [
  {
    flags: {},
    result: { isShowAll: false, isVerbose: false },
  },
  {
    flags: { [ENV_FLAGS.IHL_ALL]: "true" },
    result: { isShowAll: true, isVerbose: false },
  },
  {
    flags: { [ENV_FLAGS.IHL_ALL]: "false" },
    result: { isShowAll: false, isVerbose: false },
  },
  {
    flags: { [ENV_FLAGS.IHL_ALL]: "whatever" },
    result: { isShowAll: false, isVerbose: false },
  },
  {
    flags: { [ENV_FLAGS.IHL_VERBOSE]: "whatever" },
    result: { isShowAll: false, isVerbose: false },
  },
  {
    flags: { [ENV_FLAGS.IHL_VERBOSE]: "true" },
    result: { isShowAll: false, isVerbose: true },
  },
  {
    flags: { [ENV_FLAGS.IHL_VERBOSE]: "true", [ENV_FLAGS.IHL_ALL]: "true" },
    result: { isShowAll: true, isVerbose: true },
  },
];

describe("envStatus", () => {
  for (const tc of testCases) {
    it(`should return ${JSON.stringify(
      tc.result
    )} if in the flags we have the following values ${JSON.stringify(
      tc.flags
    )}`, () => {
      const result = envStatus(tc.flags);

      expect(result).toEqual(tc.result);
    });
  }
});
