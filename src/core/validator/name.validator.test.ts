import { afterEach, describe, it } from "vitest";
import mockFS from "mock-fs";
import { NameValidator } from "./name.validator";

describe("Name Validator", () => {
  afterEach(() => {
    mockFS.restore();
  });

  it("fails if current dir is not empty", () => {
    mockFS({
      notEmpty: {},
    });

    const result = NameValidator.validate(".");
  });
});
