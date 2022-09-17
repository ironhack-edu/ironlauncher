import { describe, expect, it } from "vitest";
import { handleBooleanValues } from "./bool-helpers";

describe("handleBooleanValues", () => {
  const testCases = [
    {
      test: "true",
      result: true,
    },
    {
      test: true,
      result: true,
    },

    {
      test: "whatever",
      result: false,
    },
  ];

  for (const tc of testCases) {
    it(`should return ${tc.result.toString()} in case of receiving ${JSON.stringify(
      tc.test
    )}`, () => {
      if (Array.isArray(tc.test)) {
        expect(handleBooleanValues(...tc.test)).toBe(tc.result);
      } else {
        expect(handleBooleanValues(tc.test)).toBe(tc.result);
      }
    });
  }

  const testCasesArr = [
    {
      test: [true, "no", "still valuablr"],
      result: true,
    },
  ];

  for (const tc of testCasesArr) {
    it(`should return ${tc.result.toString()} in case of receiving ${JSON.stringify(
      tc.test
    )}`, () => {
      expect(handleBooleanValues(...tc.test)).toBe(tc.result);
    });
  }
});
