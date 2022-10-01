import { handleBooleanValues } from "../utils";
import { ENV_FLAGS } from "../shared";

function isShowAllFlags(env: NodeJS.ProcessEnv) {
  return handleBooleanValues(env[ENV_FLAGS.IHL_ALL]);
}

function isVerboseIHL(env: NodeJS.ProcessEnv) {
  return handleBooleanValues(env[ENV_FLAGS.IHL_VERBOSE]);
}

export function envStatus(env: NodeJS.ProcessEnv = process.env) {
  return {
    isShowAll: isShowAllFlags(env),
    isVerbose: isVerboseIHL(env),
  };
}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;

  describe("show-all-flags", () => {
    it("should return true if IHL_ALL is present in env", () => {
      const result = isShowAllFlags({ [ENV_FLAGS.IHL_ALL]: "true" });
      expect(result).toBe(true);
    });

    it("should return false if IHL_ALL is present in env, but not with the string 'true'", () => {
      const result = isShowAllFlags({
        [ENV_FLAGS.IHL_ALL]: "false",
      });
      expect(result).toBe(false);
    });

    it("should return false if IHL_ALL is not present in env", () => {
      const result = isShowAllFlags({});
      expect(result).toBe(false);
    });
  });

  describe("verbose", () => {
    it("should return true if IHL_VERBOSE is present in env", () => {
      const result = isVerboseIHL({ [ENV_FLAGS.IHL_VERBOSE]: "true" });
      expect(result).toBe(true);
    });

    it("should return false if IHL_VERBOSE is present in env, but not with the string 'true'", () => {
      const result = isVerboseIHL({
        [ENV_FLAGS.IHL_VERBOSE]: "false",
      });
      expect(result).toBe(false);
    });

    it("should return false if IHL_VERBOSE is not present in env", () => {
      const result = isVerboseIHL({});
      expect(result).toBe(false);
    });
  });
}
