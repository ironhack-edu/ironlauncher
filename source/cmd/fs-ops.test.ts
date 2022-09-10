import { describe, it } from "vitest";
import { getCurrentFolder, getTemplatesDir } from "./fs-ops";
import { existsSync } from "node:fs";

describe("fs-ops", () => {
  it("gets template folder", () => {
    if (!existsSync(getTemplatesDir())) {
      throw new Error("Please do not move the templates dir");
    }
  });
});
