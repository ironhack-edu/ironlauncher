import { Result } from "@swan-io/boxed";
import { basename } from "node:path";
import { afterEach, assert, describe, expect, it, vi } from "vitest";
import { EmptyDirFunc } from "../../lib/fs/dir-empty";
import { IExistsFolder } from "../../lib/fs/folder-exists";
import { NodeFSError } from "../../utils/nodejs-fs-error";
import { makeGetNameIsInInputs } from "./name.input";
import mockFS from "mock-fs";

describe("name in inputs", () => {
  describe("no args passed", () => {
    it("should return none if no input is provided", () => {
      const func = makeGetNameIsInInputs();

      const option = func();

      assert(option.isNone());
    });

    it("should return none if an empty array gets passed", () => {
      const func = makeGetNameIsInInputs();

      const option = func([]);

      assert(option.isNone());
    });

    it("should return none if an array with an empty string gets passed", () => {
      const func = makeGetNameIsInInputs();

      const option = func([""]);

      assert(option.isNone());
    });
  });

  describe("without mocking fs", () => {
    describe("cwd", () => {
      it("gets a value in case current dir is in fact empty", () => {
        const mockFunc = vi
          .fn()
          .mockImplementation((): ReturnType<EmptyDirFunc> => {
            return Result.Ok(true);
          });

        const func = makeGetNameIsInInputs({
          dirEmpty: () => mockFunc,
        });

        const option = func(["."]);

        assert(option.isSome());
        expect(option.get()).toBe(basename(process.cwd()));
        expect(mockFunc).toHaveBeenCalledOnce();
        expect(mockFunc).toHaveBeenCalledWith(process.cwd());
      });

      it("doesnt get a value in case current dir isnt empty", () => {
        const mockFunc = vi
          .fn()
          .mockImplementation((): ReturnType<EmptyDirFunc> => {
            return Result.Ok(false);
          });

        const func = makeGetNameIsInInputs({
          dirEmpty: () => mockFunc,
        });

        const option = func(["."]);

        assert(option.isNone());
        expect(mockFunc).toHaveBeenCalledOnce();
        expect(mockFunc).toHaveBeenCalledWith(process.cwd());
      });

      it("doesnt get a value in case current dir func returns an error", () => {
        const mockFunc = vi
          .fn()
          .mockImplementation((): ReturnType<EmptyDirFunc> => {
            return Result.Error(new NodeFSError());
          });

        const func = makeGetNameIsInInputs({
          dirEmpty: () => mockFunc,
        });

        const option = func(["."]);

        assert(option.isNone());
        expect(mockFunc).toHaveBeenCalledOnce();
        expect(mockFunc).toHaveBeenCalledWith(process.cwd());
      });
    });

    describe("with named project", () => {
      it("should return a none if a folder already exists", () => {
        const mockFunc = vi
          .fn()
          .mockImplementation((): ReturnType<IExistsFolder> => {
            return Result.Ok(true);
          });

        const func = makeGetNameIsInInputs({
          folderExists: () => mockFunc,
        });

        const folderName = "whatever";
        const option = func([folderName]);

        assert(option.isNone());
        expect(mockFunc).toHaveBeenCalled();
        expect(mockFunc).toHaveBeenCalledWith(folderName);
      });

      it("should return a value if a folder doesnt exist", () => {
        const mockFunc = vi
          .fn()
          .mockImplementation((): ReturnType<IExistsFolder> => {
            return Result.Ok(false);
          });

        const func = makeGetNameIsInInputs({
          folderExists: () => mockFunc,
        });

        const folderName = "whatever";
        const option = func([folderName]);

        assert(option.isSome());
        expect(option.get()).toBe(folderName);
        expect(mockFunc).toHaveBeenCalled();
        expect(mockFunc).toHaveBeenCalledWith(folderName);
      });
    });
  });

  describe("mocking fs", () => {
    afterEach(() => {
      mockFS.restore();
    });

    describe("cwd", () => {
      it("gets a value in case current dir is in fact empty", () => {
        mockFS({});

        const func = makeGetNameIsInInputs({});

        const option = func(["."]);

        assert(option.isSome());
        expect(option.get()).toBe(basename(process.cwd()));
      });

      it("doesnt get a value in case current dir isnt empty", () => {
        mockFS({
          hello: "",
        });

        const func = makeGetNameIsInInputs();

        const option = func(["."]);

        assert(option.isNone());
      });
    });

    describe("with named project", () => {
      it("should return a none if a folder already exists", () => {
        const folderName = "whatever";
        mockFS({
          [folderName]: {},
        });

        const func = makeGetNameIsInInputs();

        const option = func([folderName]);

        assert(option.isNone());
      });

      it("should return a value if a folder doesnt exist", () => {
        mockFS({});

        const func = makeGetNameIsInInputs();

        const folderName = "whatever";
        const option = func([folderName]);

        assert(option.isSome());
        expect(option.get()).toBe(folderName);
      });
    });
  });
});
