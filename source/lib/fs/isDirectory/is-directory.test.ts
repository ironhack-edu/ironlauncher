import { afterEach, assert, describe, expect, it, vi } from "vitest";
import mockFS from "mock-fs";
import { join } from "path";
import { makeDirectoryExists } from "./is-directory";
import { Stats } from "fs";

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

  describe("with mocked func", () => {
    it("should react correctly if function returns a false", () => {
      const func = makeDirectoryExists(
        vi.fn().mockImplementation(() => {
          return {
            isDirectory() {
              return false;
            },
          };
        })
      );

      const result = func("whatever");

      assert(result.isOk());
      expect(result.get()).toBe(false);
    });

    it("should react correctly if function returns a true", () => {
      const func = makeDirectoryExists(
        vi.fn().mockImplementation(() => {
          return {
            isDirectory() {
              return true;
            },
          };
        })
      );

      const result = func("whatever");

      assert(result.isOk());
      expect(result.get()).toBe(true);
    });

    it("should react if throws an error", () => {
      const func = makeDirectoryExists(
        vi.fn().mockImplementation(() => {
          throw new Error("Irrelevant");
        })
      );

      const result = func("whatever");

      assert(result.isError());
    });
  });
});
