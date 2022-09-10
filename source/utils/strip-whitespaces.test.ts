import { describe, expect, it } from "vitest";
import { stripWhitespaces } from "./strip-whitespaces";

describe("strip whitespaces", () => {
  it("removes whitespaces", () => {
    expect(stripWhitespaces("hello world")).toBe("hello-world");
    expect(stripWhitespaces("hello world	")).toBe("hello-world-");
  });
});
