import { describe, expect, it } from "vitest";
import { multipleBooleans } from ".";

describe("bools", () => {
  const testCases = [
    {
      value: "true",
      expectation: true,
    },
    {
      expectation: false,
      value: "whatever",
    },
    {
      value: "",
      expectation: false,
    },
    {
      expectation: false,
    },
  ];

  for (const tc of testCases) {
    it(`should be ${tc.expectation} if value is ${tc.value}`, () => {
      expect(multipleBooleans(tc.value!)).toBe(tc.expectation);
    });
  }
});
