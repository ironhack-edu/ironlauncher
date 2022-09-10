import { afterEach, describe, it, vi, assert, expect } from "vitest";
import { targetDirEmpty, targetDirNotEmpty, validateName } from "./validator";
import mockFS from "mock-fs";
import { join } from "node:path";
import {
  DirNotEmptyError,
  NoSuchFolderError,
  NoValueError,
} from "./input-errors";
import prompts from "prompts";
import { askName } from "./ask-name";

afterEach(() => {
  mockFS.restore();
});

describe("targetDirNotEmpty", () => {
  describe("fail", () => {
    it("fails in case of non existing folder", () => {
      mockFS({});

      const result = targetDirNotEmpty(
        join(process.cwd(), "a-test", "should-fail")
      );
      assert(result.isError());

      expect(result.getError()).toBeInstanceOf(NoSuchFolderError);
      expect(result.value).toBeInstanceOf(NoSuchFolderError);
    });
  });

  describe("success", () => {
    it("should be return true if a specific folder is empty", () => {
      const path = join(process.cwd(), "a-test");

      mockFS({
        [path]: {},
      });

      const result = targetDirNotEmpty(path);

      assert(result.isOk());

      const value = result.get();

      expect(value).toBe(false);
      expect(!value).toEqual(targetDirEmpty(path).value);
    });
  });
});

describe("validate name", () => {
  describe(". || currentDir", () => {
    it("should display an error", () => {
      mockFS({
        notEmpty: {},
      });

      const validatedName = validateName(".");
      expect(validatedName).toBe(new DirNotEmptyError(process.cwd()).message);
    });

    it("should display true if available", () => {
      mockFS({});

      const validatedName = validateName(".");

      expect(validatedName).toBe(true);
    });
  });

  describe("target dir is exists", () => {
    it("should display an error if target dir exists", () => {
      const path = join(process.cwd(), "notEmpty");
      mockFS({
        [path]: {},
      });

      const validatedName = validateName(path);
      expect(validatedName).toBe(new DirNotEmptyError(path).message);
    });

    it("should display an error if target dir is passed as a simple string", () => {
      const notEmpty = "notEmpty";
      const path = join(process.cwd(), notEmpty);
      mockFS({
        [path]: {},
      });

      const validatedName = validateName(notEmpty);
      expect(validatedName).toBe(new DirNotEmptyError(notEmpty).message);
    });
  });

  describe("no value given", () => {
    it("should display an error if target dir exists", () => {
      const path = join(process.cwd(), "notEmpty");
      mockFS({
        [path]: {},
      });

      //   @ts-expect-error
      const validatedName = validateName();
      expect(validatedName).toBe(new NoValueError().message);
    });

    it("should display an error if target dir is passed as a simple string", () => {
      const notEmpty = "notEmpty";
      const path = join(process.cwd(), notEmpty);
      mockFS({
        [path]: {},
      });

      const validatedName = validateName(notEmpty);
      expect(validatedName).toBe(new DirNotEmptyError(notEmpty).message);
    });
  });

  it("should be successful if folder doesnt exist", () => {
    mockFS({});

    const validatedName = validateName("doesnt-matter");

    expect(validatedName).toBe(true);
  });
});

describe("ask for name", () => {
  it("if user cancels , we log and exit the process", async () => {
    prompts.inject([new Error("Oopsie")]);
    mockFS({
      notEmpty: {},
    });

    const exitterMock = vi.fn();
    const loggerMock = vi.fn();
    await askName({
      exitter: exitterMock,
      logger: loggerMock,
    });
    expect(exitterMock).toHaveBeenCalledWith(1);
    expect(loggerMock).toHaveBeenCalledWith(expect.stringContaining("name"));
  });

  it("assuming validation above works we should just get a value", async () => {
    const response = "just-works";
    prompts.inject([response]);
    mockFS({
      notEmpty: {},
    });

    const result = await askName();

    expect(result).toBe(response);
  });
});
