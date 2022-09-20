import { afterEach, assert, describe, expect, it } from "vitest";
import mockFS from "mock-fs";
import { join } from "path";
import { makeDirectoryExists } from "./isDirectory";

describe("isDirectory", () => {
  describe("with mocked filesystem", () => {
    afterEach(() => {
      mockFS.restore();
    });

    it("should work if target address is directory", () => {
      mockFS({ here: {} });

      const func = makeDirectoryExists();

      const result = func("here");

      assert(result.isOk());
    });

    it("should return false if target address is not a directory", () => {
      mockFS({ here: "" });

      const func = makeDirectoryExists();

      const result = func("here");

      assert(result.isOk());

      expect(result.get()).toBe(false);
    });

    it("should return error if target dir does not exist", () => {
      mockFS({});

      const func = makeDirectoryExists();

      const result = func("here");

      assert(result.isError());
    });
  });
});
