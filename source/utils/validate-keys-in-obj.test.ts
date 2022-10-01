import { describe, expect, it } from "vitest";
import { validateKeysInObj } from "./validate-keys-in-obj";

describe("validate keys in obj", () => {
  it("should work when empty", () => {
    expect(validateKeysInObj({}, ["hello"])).toEqual({ hello: false });
  });

  it("should work when there", () => {
    expect(validateKeysInObj({ hello: true }, ["hello"])).toEqual({
      hello: true,
    });
    expect(validateKeysInObj({ hello: "true" }, ["hello"])).toEqual({
      hello: "true",
    });
  });
});
