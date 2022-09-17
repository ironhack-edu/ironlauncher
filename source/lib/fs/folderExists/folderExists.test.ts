import { afterEach, assert, describe, expect, it, vi } from "vitest";
import { makeExistsFolder } from "./folderExists";
import mockFS from "mock-fs";

describe("folderExists", () => {
  describe("mock implementation", () => {
    it("should return Error if access func throws", () => {
      const mock = vi.fn().mockImplementation(() => {
        throw new Error("Doesnt matter");
      });
      const call = makeExistsFolder(mock);

      const result = call("folder-name");
      assert(result.isError());
      expect(mock).toHaveBeenCalledOnce();
    });

    it("should return OK if access func doesn't throw", () => {
      const mock = vi.fn().mockImplementation(() => {});
      const call = makeExistsFolder(mock);

      const result = call("folder-name");
      assert(result.isOk());
      expect(mock).toHaveBeenCalledOnce();
    });
  });

  describe("with actually hitting fs", () => {
    afterEach(() => {
      mockFS.restore();
    });

    it("should error if folder does not exist", () => {
      mockFS({});
      const sut = makeExistsFolder();

      const result = sut("hello");

      assert(result.isError());
    });

    it("should ok if folder does exist", () => {
      const folder = "hello";
      mockFS({ [folder]: {} });
      const sut = makeExistsFolder();

      const result = sut(folder);

      assert(result.isOk());
    });

    it("should ok if file does exist", () => {
      const folder = "hello";
      mockFS({ [folder]: "" });
      const sut = makeExistsFolder();

      const result = sut(folder);

      assert(result.isOk());
    });
  });
});
