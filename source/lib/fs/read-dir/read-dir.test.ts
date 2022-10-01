import mockFS from "mock-fs";
import type { DirectoryItem } from "mock-fs/lib/filesystem";
import { join } from "node:path";
import { afterEach, assert, describe, expect, it, vi } from "vitest";
import { NodeFSError } from "../../../utils/nodejs-fs-error";
import { makeReadDirFunc, type IReadDirFunc } from "./read-dir";

describe("read-dir-func", () => {
  describe("with mocked fs", () => {
    afterEach(() => {
      mockFS.restore();
    });

    it("should return error if folder does not exist", () => {
      mockFS({});

      const func = makeReadDirFunc();

      const result = func("whatever");

      assert(result.isError());
      expect(result.getError()).toBeInstanceOf(NodeFSError);
    });

    it("should return an empty string array if directory is empty", () => {
      const basePath = "whatever";
      const path = join(process.cwd(), basePath);
      mockFS({
        [path]: {},
      });
      const func = makeReadDirFunc();

      const result = func(basePath);
      assert(result.isOk());

      expect(result.get()).toEqual([]);
    });

    it("should return an array of elements is filled", () => {
      const basePath = "whatever";
      const path = join(process.cwd(), basePath);

      const mock: DirectoryItem = {
        name: "",
        value: {},
        somethingElse: {},
      };

      mockFS({
        [path]: mock,
      });
      const func = makeReadDirFunc();

      const result = func(basePath);
      assert(result.isOk());

      expect(result.get().slice().sort()).toEqual(
        Object.keys(mock).slice().sort()
      );
    });
  });

  describe("with mock item passed", () => {
    it("should return error if folder does not exist", () => {
      const funcMock = vi.fn().mockImplementation(() => {
        throw new TypeError("Oopsie");
      });

      const func = makeReadDirFunc({
        readDir: funcMock,
      });

      const toFindPath = "whatever";
      const result = func(toFindPath);

      assert(result.isError());
      expect(result.getError()).toBeInstanceOf(NodeFSError);
      expect(funcMock).toHaveBeenCalledOnce();
      expect(funcMock).toHaveBeenCalledWith(toFindPath);
    });

    it("should return an empty string array if directory is empty", () => {
      const mockReturn: string[] = [];
      const funcMock = vi.fn().mockImplementation(() => {
        return mockReturn;
      });

      const func = makeReadDirFunc({
        readDir: funcMock,
      });

      const toFindPath = "whatever";
      const result = func(toFindPath);

      assert(result.isOk());
      expect(result.get()).toEqual([]);
      expect(funcMock).toHaveBeenCalledOnce();
      expect(funcMock).toHaveBeenCalledWith(toFindPath);
    });

    it("should return an array of elements is filled", () => {
      const mockReturn = ["name", "value", "somethingElse"];

      const mockedInjection = vi.fn().mockImplementation(() => {
        return mockReturn;
      });

      const toFindPath = "whatever";

      const func = makeReadDirFunc({ readDir: mockedInjection });

      const result = func(toFindPath);
      assert(result.isOk());
      expect(result.get()).toEqual(mockReturn);
      expect(mockedInjection).toHaveBeenCalledOnce();
      expect(mockedInjection).toHaveBeenCalledWith(toFindPath);
    });
  });
});
